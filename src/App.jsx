import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Categoria from './components/Categoria.jsx';
import Produto from './components/Produto.jsx';
import Usuario from './components/Usuario.jsx';
import Fornecedor from './components/Fornecedor.jsx';
import Cliente from './components/Cliente.jsx';
import Venda from './components/Venda.jsx';
import LoginForm from './components/LoginForm.jsx';
import { getCurrentUser, logout } from './services/authService';

function App() {
    const [user, setUser] = useState(getCurrentUser());

    const handleLogin = (user) => {
        setUser(user);
    };
    const handleLogout = () => {
        logout();
        setUser(null);
    };

    if (!user) {
        return <LoginForm onLogin={handleLogin} />;
    }

    return (
        <Router>
            <div style={{ minHeight: '100vh', background: '#f7fafd' }}>
                <Navbar />
                <div style={{ display: 'flex' }}>
                    <Sidebar userRole={user.role} onLogout={handleLogout} />
                    <main style={{ flex: 1, padding: 32 }}>
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <h1>Bem-vindo, {user.role === 'admin' ? 'Administrador' : user.role === 'funcionario' ? 'Funcionário' : 'Cliente'}!</h1>
                                    <p>Escolha uma opção no menu lateral.</p>
                                </>
                            } />
                            <Route path="/categorias" element={<Categoria userRole={user.role} />} />
                            <Route path="/produtos" element={<Produto userRole={user.role} />} />
                            {user.role !== 'cliente' && <Route path="/usuarios" element={<Usuario userRole={user.role} />} />}
                            <Route path="/fornecedores" element={<Fornecedor userRole={user.role} />} />
                            <Route path="/clientes" element={<Cliente userRole={user.role} />} />
                            <Route path="/vendas" element={<Venda userRole={user.role} />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
