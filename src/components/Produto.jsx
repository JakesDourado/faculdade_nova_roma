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

const Produto = ({ userRole }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/categorias')
      .then(res => res.json())
      .then(data => setCategorias(data));
    fetch('http://localhost:3001/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!nome || !categoriaId) return;
    const produto = { categoriaId, nome, quantidade, valor };
    if (editId) {
      await fetch(`http://localhost:3001/produtos/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
      });
    } else {
      await fetch('http://localhost:3001/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
      });
    }
    setCategoriaId(''); setNome(''); setQuantidade(''); setValor(''); setEditId(null);
    fetch('http://localhost:3001/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data));
  };

  const handleEditar = (prod) => {
    setCategoriaId(prod.categoriaId);
    setNome(prod.nome);
    setQuantidade(prod.quantidade);
    setValor(prod.valor);
    setEditId(prod.id);
  };

  const handleExcluir = async (id) => {
    await fetch(`http://localhost:3001/produtos/${id}`, { method: 'DELETE' });
    fetch('http://localhost:3001/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data));
  };

  return (
    <div style={{ maxWidth: 900, marginBottom: 40 }}>
      <h2 style={{ fontWeight: 700, color: '#1976d2', marginBottom: 20 }}>Produtos</h2>
      {userRole === 'admin' && (
        <form onSubmit={handleSalvar} style={{ display: 'flex', gap: 10, marginBottom: 24, alignItems: 'center' }}>
          <select value={categoriaId} onChange={e => setCategoriaId(e.target.value)} required style={{ ...inputStyle, flex: 1, minWidth: 180, marginRight: 10 }}>
            <option value="">Selecione a categoria</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
          <input placeholder="Nome do produto" value={nome} onChange={e => setNome(e.target.value)} required style={{ ...inputStyle, flex: 2, marginRight: 10 }} />
          <input type="number" placeholder="Qtd. em estoque" value={quantidade} onChange={e => setQuantidade(e.target.value)} required min={0} style={{ ...inputStyle, width: 120, marginRight: 10 }} />
          <input type="number" placeholder="Valor unitário" value={valor} onChange={e => setValor(e.target.value)} required min={0} step={0.01} style={{ ...inputStyle, width: 120, marginRight: 10 }} />
          <button type="submit" style={buttonStyle}>{editId ? 'Atualizar' : 'Salvar'}</button>
        </form>
      )}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Categoria</th>
            <th style={thStyle}>Nome</th>
            <th style={thStyle}>Qtd. Estoque</th>
            <th style={thStyle}>Valor Unitário</th>
            {userRole === 'admin' && <th style={thStyle}>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {produtos.map(prod => (
            <tr key={prod.id}>
              <td style={tdStyle}>{categorias.find(c => c.id == prod.categoriaId)?.nome || '-'}</td>
              <td style={tdStyle}>{prod.nome}</td>
              <td style={tdStyle}>{prod.quantidade}</td>
              <td style={tdStyle}>{prod.valor}</td>
              {userRole === 'admin' && (
                <td style={tdStyle}>
                  <button onClick={() => handleEditar(prod)} style={actionBtn}>Editar</button>
                  <button onClick={() => handleExcluir(prod.id)} style={actionBtnDelete}>Excluir</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Produto;
