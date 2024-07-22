
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
    const [user, setUser] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        password_confirmation: '' 
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/register', user);
            navigate('/login');
        } catch (error) {
            console.error('Erro ao registrar:', error.response.data);
            alert('Erro ao registrar: ' + (error.response.data.error || 'Erro desconhecido'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrar</h2>
            <input type="text" name="name" placeholder="Nome" value={user.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Senha" value={user.password} onChange={handleChange} required />
            <input type="password" name="password_confirmation" placeholder="Confirme a Senha" value={user.password_confirmation} onChange={handleChange} required />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;

