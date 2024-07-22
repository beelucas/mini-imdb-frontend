

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div>
            <h2>Bem-vindo ao Mini IMDb</h2>
            <p>Esta é a página inicial. Utilize os botões abaixo para navegar.</p>
            {!auth.token ? (
                <>
                    
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    <Link to="/register">
                        <button>Registrar</button>
                    </Link>
                    <p class="aviso">*necessário logar para acessar os filmes*</p>
                </>
            ) : (
                <Link to="/filmes">
                    <button>Ver Lista de Filmes</button>
                </Link>
            )}
        </div>
    );
};

export default Home;
