import React, { useState } from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const RegisterForm = () => {
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
            <FormField label="Nome" name="name" value={user.name} onChange={handleChange} placeholder="Nome" required />
            <FormField label="Email" type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
            <FormField label="Senha" type="password" name="password" value={user.password} onChange={handleChange} placeholder="Senha" required />
            <FormField label="Confirme a Senha" type="password" name="password_confirmation" value={user.password_confirmation} onChange={handleChange} placeholder="Confirme a Senha" required />
            <Button type="submit">Registrar</Button>
        </form>
    );
};

export default RegisterForm;
