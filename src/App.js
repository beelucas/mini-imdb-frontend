import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ListaFilmes from './components/pages/ListaFilmes';
import DetalhesFilme from './components/pages/DetalhesFilme';
import AdicionarFilme from './components/pages/AdicionarFilme';
import PrivateRoute from './components/pages/PrivateRoute';
import { AuthProvider, AuthContext } from './context/AuthContext';
import './App.css';


const Header = () => {
    const { auth, logout } = useContext(AuthContext);

    return (
        <header>
            <h1>Mini IMDb</h1>
            <nav>
                <button><Link to="/">Home</Link></button>
                {auth.token ? (
                    <>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <button><Link to="/login">Login</Link></button>
                        <button><Link to="/register">Registrar</Link></button>
                        
                    </>
                )}
            </nav>
        </header>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/filmes" element={<PrivateRoute><ListaFilmes /></PrivateRoute>} />
                        <Route path="/filme/:id" element={<PrivateRoute><DetalhesFilme /></PrivateRoute>} />
                        <Route path="/adicionar-filme" element={<PrivateRoute><AdicionarFilme /></PrivateRoute>} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;


