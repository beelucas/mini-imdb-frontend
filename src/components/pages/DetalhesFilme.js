import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import DetalhesFilmeInfo from '../organisms/DetalhesFilmeInfo';
import AvaliacaoForm from '../organisms/AvaliacaoForm';
import FilmePageTemplate from '../templates/FilmePageTemplate';

const DetalhesFilme = () => {
    const { id } = useParams();
    const [filme, setFilme] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilme = async () => {
            try {
                const response = await api.get(`/filmes/${id}`);
                setFilme(response.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do filme:', error);
                setError(error);
            }
        };

        fetchFilme();
    }, [id]);

    const handleAvaliacaoSubmit = async () => {
        try {
            const response = await api.get(`/filmes/${id}`);
            setFilme(response.data);
        } catch (error) {
            console.error('Erro ao atualizar avaliações:', error);
            setError(error);
        }
    };

    if (error) {
        return <div>Erro ao carregar filme. Por favor, tente novamente mais tarde.</div>;
    }

    if (!filme) {
        return <div>Carregando...</div>;
    }    

    return (
        <FilmePageTemplate 
            filmeInfo={<DetalhesFilmeInfo filme={filme} />} 
            avaliacaoForm={<AvaliacaoForm filmeId={id} onAvaliacaoSubmit={handleAvaliacaoSubmit} />} 
        />
    );
};

export default DetalhesFilme;
