import React, { useState, useEffect } from 'react';
import api from '../../api';

const LikeDislike = ({ avaliacaoId }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    useEffect(() => {
        const fetchLikesDislikes = async () => {
            try {
                const response = await api.get(`/avaliacoes/${avaliacaoId}`);
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
            } catch (error) {
                console.error('Erro ao buscar contagem de likes/dislikes:', error);
            }
        };

        fetchLikesDislikes();
    }, [avaliacaoId]);

    const handleLike = async () => {
        try {
            await api.post(`/avaliacoes/${avaliacaoId}/like`);
            setLikes(likes + 1);
        } catch (error) {
            console.error('Erro ao dar like:', error);
        }
    };

    const handleDislike = async () => {
        try {
            await api.post(`/avaliacoes/${avaliacaoId}/dislike`);
            setDislikes(dislikes + 1);
        } catch (error) {
            console.error('Erro ao dar dislike:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLike}>Like {likes}</button>
            <button onClick={handleDislike}>Dislike {dislikes}</button>
        </div>
    );
};

export default LikeDislike;

