import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ userRole, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const current = location.pathname;
  return (
    <aside style={{ width: 220, background: '#f4f6fa', height: '100vh', padding: 24, boxSizing: 'border-box', borderRight: '1px solid #ddd', minWidth: 180 }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ marginBottom: 20 }}>
          <a href="#" onClick={() => navigate('/')} style={{ color: current === '/' ? '#fff' : '#1976d2', background: current === '/' ? '#1976d2' : 'none', textDecoration: 'none', fontWeight: 'bold', fontSize: 16, padding: 8, borderRadius: 4, display: 'block' }}>Dashboard</a>
        </li>
        <li style={{ marginBottom: 20 }}>
          <a href="#" onClick={() => navigate('/categorias')} style={{ color: current === '/categorias' ? '#fff' : '#1976d2', background: current === '/categorias' ? '#1976d2' : 'none', textDecoration: 'none', fontSize: 16, padding: 8, borderRadius: 4, display: 'block' }}>Categorias</a>
        </li>
        <li style={{ marginBottom: 20 }}>
          <a href="#" onClick={() => navigate('/produtos')} style={{ color: current === '/produtos' ? '#fff' : '#1976d2', background: current === '/produtos' ? '#1976d2' : 'none', textDecoration: 'none', fontSize: 16, padding: 8, borderRadius: 4, display: 'block' }}>Produtos</a>
        </li>
        <li style={{ marginBottom: 20 }}>
          {userRole !== 'cliente' && (
            <a href="#" onClick={() => navigate('/usuarios')} style={{ color: current === '/usuarios' ? '#fff' : '#1976d2', background: current === '/usuarios' ? '#1976d2' : 'none', textDecoration: 'none', fontSize: 16, padding: 8, borderRadius: 4, display: 'block' }}>Usuários</a>
          )}
        </li>
        <li style={{ marginBottom: 20 }}>
          <a href="#" onClick={() => navigate('/fornecedores')} style={{ color: current === '/fornecedores' ? '#fff' : '#1976d2', background: current === '/fornecedores' ? '#1976d2' : 'none', textDecoration: 'none', fontSize: 16, padding: 8, borderRadius: 4, display: 'block' }}>Fornecedores</a>
        </li>
        <li style={{ marginBottom: 20 }}>
          <a href="#" onClick={() => navigate('/clientes')} style={{ color: current === '/clientes' ? '#fff' : '#1976d2', background: current === '/clientes' ? '#1976d2' : 'none', textDecoration: 'none', fontSize: 16, padding: 8, borderRadius: 4, display: 'block' }}>Clientes</a>
        </li>
        <li style={{ marginBottom: 20 }}>
          <a href="#" onClick={() => navigate('/vendas')} style={{ color: current === '/vendas' ? '#fff' : '#1976d2', background: current === '/vendas' ? '#1976d2' : 'none', textDecoration: 'none', fontSize: 16, padding: 8, borderRadius: 4, display: 'block' }}>Vendas</a>
        </li>
      </ul>
      <div style={{ marginTop: 40 }}>
        <button onClick={onLogout} style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', width: '100%' }}>Sair</button>
        <div style={{ marginTop: 16, color: '#888', fontSize: 14, textAlign: 'center' }}>Perfil: <b>{userRole === 'admin' ? 'Administrador' : 'Funcionário'}</b></div>
      </div>
    </aside>
  );
};

export default Sidebar;