import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AdicionarFilme = () => {
    const [filme, setFilme] = useState({
        titulo: '',
        genero: '',
        ano_lancamento: '',
        diretor: '',
        elenco: '',
        sinopse: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFilme({
            ...filme,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await api.post('/filmes', filme, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/filmes');
        } catch (error) {
            setError(error);
            console.error('Erro ao adicionar filme:', error.response.data);
            alert('Erro ao adicionar filme: ' + (error.response.data.message || 'Erro desconhecido'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Adicionar Filme</h2>
            <input type="text" name="titulo" placeholder="Título" value={filme.titulo} onChange={handleChange} required />
            <input type="text" name="genero" placeholder="Gênero" value={filme.genero} onChange={handleChange} required />
            <input type="number" name="ano_lancamento" placeholder="Ano de Lançamento" value={filme.ano_lancamento} onChange={handleChange} required />
            <input type="text" name="diretor" placeholder="Diretor" value={filme.diretor} onChange={handleChange} required />
            <input type="text" name="elenco" placeholder="Elenco" value={filme.elenco} onChange={handleChange} required />
            <textarea name="sinopse" placeholder="Sinopse" value={filme.sinopse} onChange={handleChange} required></textarea>
            <button type="submit">Adicionar Filme</button>
            {error && <p>Erro ao adicionar filme: {error.message}</p>}
        </form>
    );
};

export default AdicionarFilme;

