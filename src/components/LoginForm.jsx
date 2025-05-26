import React, { useState } from 'react';
import { login, setCurrentUser } from '../services/authService';

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: 6, border: '1px solid #ccc', fontSize: 16, background: '#fafbfc', marginBottom: 16
};
const buttonStyle = {
  background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', transition: 'background 0.2s', marginTop: 8
};

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const user = await login(email, password);
    if (user) {
      setCurrentUser(user);
      onLogin(user);
    } else {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 340, margin: '80px auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 16px #0002', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 24 }}>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
      <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <button type="submit" style={buttonStyle}>Entrar</button>
    </form>
  );
}

// Renomeie este arquivo para LoginForm.jsx para evitar erro de sintaxe com JSX
