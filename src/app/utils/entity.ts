interface ApiAnime {
  aired: {
    from: string
    prop: {
      from: {
        day: number
        month: number
        year: number
      }
      to: {
        day: number | null
        month: number | null
        year: number | null
      }
    }
    string: string
    to: string | null
  }
  airing: boolean
  approved: boolean
  background: string
  broadcast: {
    day: string
    string: string
    time: string
    timezone: string
  }
  demographics: {
    mal_id: number
    name: string
    type: string
    url: string
  }[]
  duration: string
  episodes: number
  explicit_genres: any[]
  favorites: number
  genres: {
    mal_id: number
    name: string
    type: string
    url: string
  }[]
  images: {
    jpg: {
      image_url: string
      large_image_url: string
      small_image_url: string
    }
    webp: {
      image_url: string
      large_image_url: string
      small_image_url: string
    }
  }
  licensors: {
    mal_id: number
    name: string
    type: string
    url: string
  }[]
  mal_id: number
  members: number
  popularity: number
  producers: {
    mal_id: number
    name: string
    type: string
    url: string
  }[]
  rank: number
  rating: string
  score: number
  scored_by: number
  season: string
  source: string
  status: string
  studios: {
    mal_id: number
    name: string
    type: string
    url: string
  }[]
  synopsis: string
  themes: any[]
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string[]
  titles: {
    title: string
    type: string
  }[]
  trailer: {
    embed_url: string
    images: {
      image_url: string
      large_image_url: string
      maximum_image_url: string
      medium_image_url: string
      small_image_url: string
    }
    url: string
    youtube_id: string
  }
  type: string
  url: string
  year: number
}

interface Anime {
  title: string
  episodes: number
  airingStart: string
  coverImage: string
  link: string
  timeUntilNextEp: {
    days: number
    hours: number
    minutes: number
  } | null
  finished: boolean
  popularity: number
  synopsis: string
  status: string
}

interface Season {
  year: string
  seasons: Array<'spring' | 'summer' | 'fall' | 'winter'>
}

interface User {
  username: string
  email?: string
  profilePicture?: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  getUser: () => User | null
  isAuthenticated: boolean
}

export type { ApiAnime, Anime, Season, User, AuthContextType }
