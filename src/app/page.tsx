'use client'

import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia, CircularProgress } from '@mui/material';

const Home = () => {
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimes = async () => {
          try{
            const response = await fetch('http://localhost:5000/airing_anime');
            const data = await response.json();
            setAnimes(data.data.Page.airingSchedules);
          }catch(err){
            console.error(err);
          } finally {
            setLoading(false);
          }
        };

        fetchAnimes();
    }, []);

    return (
        <Container>
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </div>
            ) : (
                <Grid container spacing={3}>
                    {animes.map((anime: any) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={anime.media.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={anime.media.coverImage.extraLarge}
                                    alt={anime.media.title.english || anime.media.title.native}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {anime.media.title.english || anime.media.title.native}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Next episode in: {formatTimeUntilNextEpisode(anime.timeUntilAiring)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

const formatTimeUntilNextEpisode = (secondsUntilNextEpisode: number) => {
    const hours = Math.floor(secondsUntilNextEpisode / 3600);
    const minutes = Math.floor((secondsUntilNextEpisode % 3600) / 60);
    return `${hours} hours ${minutes} minutes`;
};

export default Home;
