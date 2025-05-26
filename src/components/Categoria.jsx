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

const Categoria = ({ userRole }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/categorias')
      .then(res => res.json())
      .then(data => setCategorias(data));
  }, []);

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!nome) return;
    if (editId) {
      await fetch(`http://localhost:3001/categorias/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, descricao })
      });
    } else {
      await fetch('http://localhost:3001/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, descricao })
      });
    }
    setNome(''); setDescricao(''); setEditId(null);
    fetch('http://localhost:3001/categorias')
      .then(res => res.json())
      .then(data => setCategorias(data));
  };

  const handleEditar = (cat) => {
    setNome(cat.nome);
    setDescricao(cat.descricao);
    setEditId(cat.id);
  };

  const handleExcluir = async (id) => {
    await fetch(`http://localhost:3001/categorias/${id}`, { method: 'DELETE' });
    fetch('http://localhost:3001/categorias')
      .then(res => res.json())
      .then(data => setCategorias(data));
  };

  return (
    <div style={{ maxWidth: 900, marginBottom: 40 }}>
      <h2 style={{ fontWeight: 700, color: '#1976d2', marginBottom: 20 }}>Categorias</h2>
      {userRole === 'admin' && (
        <form onSubmit={handleSalvar} style={{ display: 'flex', gap: 10, marginBottom: 24, alignItems: 'center' }}>
          <input placeholder="Nome da categoria" value={nome} onChange={e => setNome(e.target.value)} required style={{ ...inputStyle, flex: 2, marginRight: 10 }} />
          <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} style={{ ...inputStyle, flex: 3, marginRight: 10 }} />
          <button type="submit" style={buttonStyle}>{editId ? 'Atualizar' : 'Salvar'}</button>
        </form>
      )}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Nome</th>
            <th style={thStyle}>Descrição</th>
            {userRole === 'admin' && <th style={thStyle}>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {categorias.map(cat => (
            <tr key={cat.id}>
              <td style={tdStyle}>{cat.nome}</td>
              <td style={tdStyle}>{cat.descricao}</td>
              {userRole === 'admin' && (
                <td style={tdStyle}>
                  <button onClick={() => handleEditar(cat)} style={actionBtn}>Editar</button>
                  <button onClick={() => handleExcluir(cat.id)} style={actionBtnDelete}>Excluir</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categoria;
