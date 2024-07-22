
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', credentials);
            login(response.data.token);
            navigate('/filmes');
        } catch (error) {
            console.error('Erro ao fazer login:', error.response.data);
            alert('Erro ao fazer login.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Senha" value={credentials.password} onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;

