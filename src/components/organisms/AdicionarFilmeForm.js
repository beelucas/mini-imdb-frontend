import React, { useState } from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const AdicionarFilmeForm = () => {
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
            await api.post('/filmes', filme, {
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
            <FormField label="Título" name="titulo" value={filme.titulo} onChange={handleChange} placeholder="Título" required />
            <FormField label="Gênero" name="genero" value={filme.genero} onChange={handleChange} placeholder="Gênero" required />
            <FormField label="Ano de Lançamento" type="number" name="ano_lancamento" value={filme.ano_lancamento} onChange={handleChange} placeholder="Ano de Lançamento" required />
            <FormField label="Diretor" name="diretor" value={filme.diretor} onChange={handleChange} placeholder="Diretor" required />
            <FormField label="Elenco" name="elenco" value={filme.elenco} onChange={handleChange} placeholder="Elenco" required />
            <FormField label="Sinopse" name="sinopse" value={filme.sinopse} onChange={handleChange} isTextarea placeholder="Sinopse" required />
            <Button type="submit">Adicionar Filme</Button>
            {error && <p>Erro ao adicionar filme: {error.message}</p>}
        </form>
    );
};

export default AdicionarFilmeForm;
