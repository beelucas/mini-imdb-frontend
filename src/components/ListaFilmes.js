import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

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

    if (error) {
        return <div>Erro ao carregar filmes. Por favor, tente novamente mais tarde.</div>;
    }

    const handleAddFilme = () => {
        navigate('/adicionar-filme'); 
    };

    const handleDetalhesFilme = (id) => {
        navigate(`/filme/${id}`);
    };

    return (
        <div>
            <h2>Lista de Filmes</h2>
            {filmes.map(filme => (
                <div key={filme.id} className="list-item" onClick={() => handleDetalhesFilme(filme.id)}>
                    <h3>{filme.titulo}</h3>
                    <p><strong>Gênero:</strong> {filme.genero}</p>
                    <p><strong>Ano de Lançamento:</strong> {filme.ano_lancamento}</p>
                    <p><strong>Diretor:</strong> {filme.diretor}</p>
                    <p><strong>Elenco:</strong> {filme.elenco}</p>
                    <p><strong>Sinopse:</strong> {filme.sinopse}</p>
                </div>
            ))}
            <div>
                <button onClick={handleAddFilme}>ADICIONAR FILME</button>
            </div>
        </div>
    );
};

export default ListaFilmes;

