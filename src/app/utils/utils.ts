import {
  add,
  differenceInDays,
  differenceInHours,
  differenceInMinutes
} from 'date-fns'
import { Anime, ApiAnime } from './entity'

const formatAiringAnime = async (response: Response): Promise<Anime[]> => {
  try {
    const data = await response.json()
    const formattedData: Anime[] = data.map((anime: ApiAnime) => ({
      title: anime.title,
      episodes: anime.episodes,
      airingStart: anime.aired.from,
      coverImage: anime.images.jpg.large_image_url,
      link: anime.url,
      timeUntilNextEp: getTimeUntilNextBroadcast(anime.broadcast || null),
      finished: anime.airing,
      popularity: anime.popularity,
      synopsis: anime.synopsis
    }))
    return formattedData.sort((a, b) => a.popularity - b.popularity)
  } catch (err) {
    console.log(err)
    return []
  }
}

function getTimeUntilNextBroadcast(broadcast: ApiAnime['broadcast']) {
  if (!broadcast) return null

  const now = new Date()

  const { day, time } = broadcast

  if (!day || !time) return null

  const targetDayIndex = [
    'Sundays',
    'Mondays',
    'Tuesdays',
    'Wednesdays',
    'Thursdays',
    'Fridays',
    'Saturdays'
  ].indexOf(day)

  const [hours, minutes] = time.split(':').map(Number)
  let targetDate = add(now, { days: (targetDayIndex - now.getDay() + 7) % 7 })
  targetDate.setHours(hours)
  targetDate.setMinutes(minutes)
  targetDate.setSeconds(0)
  targetDate.setMilliseconds(0)

  if (targetDate <= now) {
    targetDate = add(targetDate, { days: 7 })
  }

  const daysUntilNext = differenceInDays(targetDate, now)
  const hoursUntilNext = differenceInHours(targetDate, now) % 24
  const minutesUntilNext = differenceInMinutes(targetDate, now) % 60

  return {
    days: daysUntilNext,
    hours: hoursUntilNext,
    minutes: minutesUntilNext
  }
}

export { getTimeUntilNextBroadcast, formatAiringAnime }
