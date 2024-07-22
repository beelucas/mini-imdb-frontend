
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth({ token });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuth({ token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

