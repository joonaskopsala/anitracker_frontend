import { Paper, Typography } from '@mui/material';
import React from 'react';

const Card = ({ anime }) => {
    const { title, coverImage, airingAt } = anime.media;
    const episode = anime.episode;

    const getTimeRemaining = () => {
        const now = new Date().getTime();
        const timeLeft = new Date(airingAt * 1000).getTime() - now;
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours} hours ${minutes} minutes`;
    };

    return (
        <Paper>
            <img src={coverImage.large} alt={title.english || title.native} />
            <Typography>{title.english || title.native}</Typography>
            <Typography>Next Episode ({episode}) in: {getTimeRemaining()}</Typography>
        </Paper>
    );
};

export {Card}
