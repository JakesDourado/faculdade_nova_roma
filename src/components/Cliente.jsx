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

const Cliente = ({ userRole }) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [clientes, setClientes] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/clientes')
      .then(res => res.json())
      .then(data => setClientes(data));
  }, []);

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!nome || !email) return;
    const cliente = { nome, telefone, email };
    if (editId) {
      await fetch(`http://localhost:3001/clientes/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });
    } else {
      await fetch('http://localhost:3001/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });
    }
    setNome(''); setTelefone(''); setEmail(''); setEditId(null);
    fetch('http://localhost:3001/clientes')
      .then(res => res.json())
      .then(data => setClientes(data));
  };

  const handleEditar = (cli) => {
    setNome(cli.nome);
    setTelefone(cli.telefone || '');
    setEmail(cli.email);
    setEditId(cli.id);
  };

  const handleExcluir = async (id) => {
    await fetch(`http://localhost:3001/clientes/${id}`, { method: 'DELETE' });
    fetch('http://localhost:3001/clientes')
      .then(res => res.json())
      .then(data => setClientes(data));
  };

  return (
    <div style={{ maxWidth: 900, marginBottom: 40 }}>
      <h2 style={{ fontWeight: 700, color: '#1976d2', marginBottom: 20 }}>Clientes</h2>
      {(userRole === 'admin' || userRole === 'funcionario') && (
        <form onSubmit={handleSalvar} style={{ display: 'flex', gap: 10, marginBottom: 24, alignItems: 'center' }}>
          <input placeholder="Nome do cliente" value={nome} onChange={e => setNome(e.target.value)} required style={{ ...inputStyle, flex: 2, marginRight: 10 }} />
          <input placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} style={{ ...inputStyle, flex: 2, marginRight: 10 }} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ ...inputStyle, flex: 3, marginRight: 10 }} />
          <button type="submit" style={buttonStyle}>{editId ? 'Atualizar' : 'Salvar'}</button>
        </form>
      )}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Nome</th>
            <th style={thStyle}>Telefone</th>
            <th style={thStyle}>Email</th>
            {(userRole === 'admin' || userRole === 'funcionario') && <th style={thStyle}>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {clientes.map(cli => (
            <tr key={cli.id}>
              <td style={tdStyle}>{cli.nome}</td>
              <td style={tdStyle}>{cli.telefone}</td>
              <td style={tdStyle}>{cli.email}</td>
              {(userRole === 'admin' || userRole === 'funcionario') && (
                <td style={tdStyle}>
                  <button onClick={() => handleEditar(cli)} style={actionBtn}>Editar</button>
                  <button onClick={() => handleExcluir(cli.id)} style={actionBtnDelete}>Excluir</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cliente;
