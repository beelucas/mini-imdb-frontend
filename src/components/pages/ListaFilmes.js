import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import ListaFilmesContent from '../organisms/ListaFilmesContent';

const ListaFilmes = () => {
    const [filmes, setFilmes] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFilmes = async () => {
            try {
                const response = await api.get('/filmes');
                setFilmes(response.data);
            } catch (error) {
                setError(error);
                console.error('Erro ao buscar filmes:', error);
            }
        };

        fetchFilmes();
    }, []);

    const handleAddFilme = () => {
        navigate('/adicionar-filme'); 
    };

    const handleDetalhesFilme = (id) => {
        navigate(`/filme/${id}`);
    };

    if (error) {
        return <div>Erro ao carregar filmes. Por favor, tente novamente mais tarde.</div>;
    }

    return <ListaFilmesContent filmes={filmes} onAddFilme={handleAddFilme} onDetalhesFilme={handleDetalhesFilme} />;
};

export default ListaFilmes;
