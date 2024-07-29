import React from 'react';
import Button from '../atoms/Button'

const ListaFilmesContent = ({ filmes, onAddFilme, onDetalhesFilme }) => (
    <div>
        <h2>Lista de Filmes</h2>
        {filmes.map(filme => (
            <div key={filme.id} className="list-item" onClick={() => onDetalhesFilme(filme.id)}>
                <h3>{filme.titulo}</h3>
                <p><strong>Gênero:</strong> {filme.genero}</p>
                <p><strong>Ano de Lançamento:</strong> {filme.ano_lancamento}</p>
                <p><strong>Diretor:</strong> {filme.diretor}</p>
                <p><strong>Elenco:</strong> {filme.elenco}</p>
                <p><strong>Sinopse:</strong> {filme.sinopse}</p>
            </div>
        ))}
        <div>
            <Button onClick={onAddFilme}>ADICIONAR FILME</Button>
        </div>
    </div>
);

export default ListaFilmesContent;
