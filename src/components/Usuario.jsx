import React, { useState, useEffect } from 'react';

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 16,
  background: '#fafbfc',
  marginBottom: 0
};
const buttonStyle = {
  background: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '10px 24px',
  fontWeight: 'bold',
  fontSize: 16,
  cursor: 'pointer',
  transition: 'background 0.2s',
  marginLeft: 8
};
const tableStyle = {
  width: '100%',
  background: '#fff',
  borderCollapse: 'collapse',
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: '0 2px 8px #0001',
  marginTop: 16
};
const thStyle = {
  padding: 12,
  background: '#f5f5f5',
  borderBottom: '1px solid #e0e0e0',
  textAlign: 'left',
  fontWeight: 600
};
const tdStyle = {
  padding: 12,
  borderBottom: '1px solid #f0f0f0',
  fontSize: 15
};
const actionBtn = {
  ...buttonStyle,
  padding: '6px 16px',
  fontSize: 14,
  marginLeft: 0,
  marginRight: 8
};
const actionBtnDelete = {
  ...actionBtn,
  background: '#e53935',
};

const Usuario = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }, []);

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!nome || !email) return;
    const usuario = { nome, telefone, email };
    if (editId) {
      await fetch(`http://localhost:3001/usuarios/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });
    } else {
      await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });
    }
    setNome(''); setTelefone(''); setEmail(''); setEditId(null);
    fetch('http://localhost:3001/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data));
  };

  const handleEditar = (user) => {
    setNome(user.nome);
    setTelefone(user.telefone || '');
    setEmail(user.email);
    setEditId(user.id);
  };

  const handleExcluir = async (id) => {
    await fetch(`http://localhost:3001/usuarios/${id}`, { method: 'DELETE' });
    fetch('http://localhost:3001/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data));
  };

  return (
    <div style={{ maxWidth: 900, marginBottom: 40 }}>
      <h2 style={{ fontWeight: 700, color: '#1976d2', marginBottom: 20 }}>Usuários</h2>
      <form onSubmit={handleSalvar} style={{ display: 'flex', gap: 10, marginBottom: 24, alignItems: 'center' }}>
        <input placeholder="Nome do usuário" value={nome} onChange={e => setNome(e.target.value)} required style={{ ...inputStyle, flex: 2, marginRight: 10 }} />
        <input placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} style={{ ...inputStyle, flex: 2, marginRight: 10 }} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ ...inputStyle, flex: 3, marginRight: 10 }} />
        <button type="submit" style={buttonStyle}>{editId ? 'Atualizar' : 'Salvar'}</button>
      </form>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Nome</th>
            <th style={thStyle}>Telefone</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td style={tdStyle}>{user.nome}</td>
              <td style={tdStyle}>{user.telefone}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>
                <button onClick={() => handleEditar(user)} style={actionBtn}>Editar</button>
                <button onClick={() => handleExcluir(user.id)} style={actionBtnDelete}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuario;
