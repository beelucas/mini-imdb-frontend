import React, { useState, useContext } from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
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
            <FormField label="Email" type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" required />
            <FormField label="Senha" type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Senha" required />
            <Button type="submit">Login</Button>
        </form>
    );
};

export default LoginForm;
