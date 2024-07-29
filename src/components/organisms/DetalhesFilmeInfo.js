import React from 'react';
import LikeDislike from '../molecules/LikeDislike';

const DetalhesFilmeInfo = ({ filme }) => {
    const {titulo, sinopse, avaliacoes } = filme.filme;
    return(
    <div>
        <h1>{titulo}</h1>
        <p>{sinopse}</p>
        <h2>Nota Média: {filme.mediaAvaliacao ? filme.mediaAvaliacao.toFixed(2) : 'Sem avaliações'}</h2>
        <h2>Avaliações</h2>
        {Array.isArray(filme.filme.avaliacoes) && filme.filme.avaliacoes.length > 0 ? (
            <ul>
                {filme.filme.avaliacoes.map(avaliacao => (
                    <li key={avaliacao.id}>
                        <p><strong>Usuário:</strong> {avaliacao.user.name}</p>
                        <p className="avaliacao">{avaliacao.pontuacao} estrelas - {avaliacao.comentario}</p>
                        <LikeDislike avaliacaoId={avaliacao.id} initialLikeStatus={avaliacao.user_like_status }/>
                    </li>
                ))}
            </ul>
        ) : (
            <p>Sem avaliações até o momento.</p>
        )}
    </div>
);
};

export default DetalhesFilmeInfo;
