import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const DetalhesFilme = () => {
    const { id } = useParams();
    const [filme, setFilme] = useState(null);
    const [avaliacao, setAvaliacao] = useState({ pontuacao: '', comentario: '' });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAvaliacao({ ...avaliacao, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            
            await api.post(`/filmes/${id}/avaliacoes`, {
                filme_id: id,
                ...avaliacao
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const response = await api.get(`/filmes/${id}`);
            setFilme(response.data);
            setAvaliacao({ pontuacao: '', comentario: '' });
        } catch (error) {
            console.error('Erro ao adicionar avaliação:', error);
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
        <div>
            <h1>{filme.titulo}</h1>
            <p>{filme.sinopse}</p>
            <h2>Avaliações</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Pontuação:</label>
                    <input 
                        type="number" 
                        name="pontuacao" 
                        value={avaliacao.pontuacao} 
                        onChange={handleChange} 
                        min="1"
                        max="5"
                        required 
                    />
                </div>
                <div>
                    <label>Comentário:</label>
                    <textarea 
                        name="comentario" 
                        value={avaliacao.comentario} 
                        onChange={handleChange} 
                        required 
                        className="comentario-textarea"
                    />
                </div>
                <button type="submit">Enviar Avaliação</button>
            </form>
            {Array.isArray(filme.avaliacoes) && filme.avaliacoes.length > 0 ? (
                <ul>
                    {filme.avaliacoes.map(avaliacao => (
                        <li key={avaliacao.id}>
                            <p><strong>Usuário:</strong> {avaliacao.user.name}</p>
                            <p class="avaliacao">{avaliacao.pontuacao} estrelas - {avaliacao.comentario}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Sem avaliações até o momento.</p>
            )}
            {error && <div>Erro ao adicionar avaliação. Por favor, tente novamente mais tarde.</div>}
        </div>
    );
};

export default DetalhesFilme;
