import React, { useState } from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import api from '../../api';

const AvaliacaoForm = ({ filmeId, onAvaliacaoSubmit }) => {
    const [avaliacao, setAvaliacao] = useState({ pontuacao: '', comentario: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAvaliacao({ ...avaliacao, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await api.post(`/filmes/${filmeId}/avaliacoes`, {
                filme_id: filmeId,
                ...avaliacao
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            onAvaliacaoSubmit();
            setAvaliacao({ pontuacao: '', comentario: '' });
        } catch (error) {
            console.error('Erro ao adicionar avaliação:', error);
            setError(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormField label="Pontuação" type="number" name="pontuacao" value={avaliacao.pontuacao} onChange={handleChange} min="1" max="5" required />
            <FormField label="Comentário" name="comentario" value={avaliacao.comentario} onChange={handleChange} isTextarea required />
            <Button type="submit">Enviar Avaliação</Button>
            {error && <p>Erro ao adicionar avaliação: {error.message}</p>}
        </form>
    );
};

export default AvaliacaoForm;
