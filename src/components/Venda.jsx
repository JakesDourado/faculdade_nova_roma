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
const modalOverlay = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.3)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 1000
};
const modalBox = {
  background: '#fff',
  borderRadius: 8,
  padding: 32,
  minWidth: 320,
  boxShadow: '0 2px 16px #0003',
  textAlign: 'center'
};

const Venda = ({ userRole }) => {
  const [clientes, setClientes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [editId, setEditId] = useState(null);
  const [modalVendaId, setModalVendaId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/clientes').then(res => res.json()).then(setClientes);
    fetch('http://localhost:3001/categorias').then(res => res.json()).then(setCategorias);
    fetch('http://localhost:3001/produtos').then(res => res.json()).then(setProdutos);
    fetch('http://localhost:3001/vendas').then(res => res.json()).then(setVendas);
  }, []);

  const produtosFiltrados = produtos.filter(p => p.categoriaId === categoriaId);

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!clienteId || !categoriaId || !produtoId || !quantidade) return;
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto || Number(produto.quantidade) < Number(quantidade)) {
      alert('Estoque insuficiente!');
      return;
    }
    const venda = { clienteId, categoriaId, produtoId, quantidade };
    if (editId) {
      await fetch(`http://localhost:3001/vendas/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venda)
      });
    } else {
      await fetch('http://localhost:3001/vendas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venda)
      });
      // Atualiza estoque do produto
      await fetch(`http://localhost:3001/produtos/${produtoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantidade: String(Number(produto.quantidade) - Number(quantidade)) })
      });
    }
    setClienteId(''); setCategoriaId(''); setProdutoId(''); setQuantidade(''); setEditId(null);
    fetch('http://localhost:3001/vendas').then(res => res.json()).then(setVendas);
    fetch('http://localhost:3001/produtos').then(res => res.json()).then(setProdutos);
  };

  const handleExcluir = async (id) => {
    await fetch(`http://localhost:3001/vendas/${id}`, { method: 'DELETE' });
    fetch('http://localhost:3001/vendas').then(res => res.json()).then(setVendas);
  };

  const handleEditar = (venda) => {
    setClienteId(venda.clienteId);
    setCategoriaId(venda.categoriaId);
    setProdutoId(venda.produtoId);
    setQuantidade(venda.quantidade);
    setEditId(venda.id);
  };

  const handleVender = async (id) => {
    const venda = vendas.find(v => v.id === id);
    if (venda && venda.status === 'vendido') {
      setModalVendaId(id);
      return;
    }
    await fetch(`http://localhost:3001/vendas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'vendido' })
    });
    fetch('http://localhost:3001/vendas').then(res => res.json()).then(setVendas);
  };

  const handleCancelarVenda = async (id) => {
    await fetch(`http://localhost:3001/vendas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: undefined })
    });
    setModalVendaId(null);
    fetch('http://localhost:3001/vendas').then(res => res.json()).then(setVendas);
  };

  return (
    <div style={{ maxWidth: 900, marginBottom: 40 }}>
      <h2 style={{ fontWeight: 700, color: '#1976d2', marginBottom: 20 }}>Vendas</h2>
      {(userRole === 'admin' || userRole === 'funcionario') && (
        <form onSubmit={handleSalvar} style={{ display: 'flex', gap: 10, marginBottom: 24, alignItems: 'center' }}>
          <select value={clienteId} onChange={e => setClienteId(e.target.value)} required style={{ ...inputStyle, flex: 2, marginRight: 10 }}>
            <option value="">Selecione o cliente</option>
            {clientes.map(cli => (
              <option key={cli.id} value={cli.id}>{cli.nome}</option>
            ))}
          </select>
          <select value={categoriaId} onChange={e => { setCategoriaId(e.target.value); setProdutoId(''); }} required style={{ ...inputStyle, flex: 2, marginRight: 10 }}>
            <option value="">Selecione a categoria</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
          <select value={produtoId} onChange={e => setProdutoId(e.target.value)} required style={{ ...inputStyle, flex: 2, marginRight: 10 }}>
            <option value="">Selecione o produto</option>
            {produtosFiltrados.map(prod => (
              <option key={prod.id} value={prod.id}>{prod.nome} (Estoque: {prod.quantidade})</option>
            ))}
          </select>
          <input type="number" placeholder="Qtd." value={quantidade} onChange={e => setQuantidade(e.target.value)} required min={1} style={{ ...inputStyle, width: 100, marginRight: 10 }} />
          <button type="submit" style={buttonStyle}>{editId ? 'Atualizar' : 'Salvar'}</button>
        </form>
      )}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Cliente</th>
            <th style={thStyle}>Categoria</th>
            <th style={thStyle}>Produto</th>
            <th style={thStyle}>Qtd.</th>
            <th style={thStyle}>Valor Unitário</th>
            <th style={thStyle}>Total</th>
            {(userRole === 'admin' || userRole === 'funcionario') && <th style={thStyle}>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {vendas.map(venda => {
            const produto = produtos.find(p => String(p.id) === String(venda.produtoId));
            const valorUnitario = produto ? Number(produto.valor) : 0;
            const total = valorUnitario * Number(venda.quantidade);
            return (
              <tr key={venda.id}>
                <td style={tdStyle}>{clientes.find(c => String(c.id) === String(venda.clienteId))?.nome || '-'}</td>
                <td style={tdStyle}>{categorias.find(c => String(c.id) === String(venda.categoriaId))?.nome || '-'}</td>
                <td style={tdStyle}>{produto?.nome || '-'}</td>
                <td style={tdStyle}>{venda.quantidade}</td>
                <td style={tdStyle}>{produto ? `R$ ${Number(produto.valor).toFixed(2)}` : '-'}</td>
                <td style={tdStyle}>{produto ? `R$ ${(total).toFixed(2)}` : '-'}</td>
                {(userRole === 'admin' || userRole === 'funcionario') ? (
                  <td style={tdStyle}>
                    {venda.status === 'vendido' ? (
                      <button onClick={() => handleVender(venda.id)} style={{ ...actionBtn, background: '#43a047', color: '#fff' }}>Vendido</button>
                    ) : (
                      <button onClick={() => handleVender(venda.id)} style={{ ...actionBtn, background: '#ff9800', color: '#fff' }}>Vender</button>
                    )}
                    <button onClick={() => handleEditar(venda)} style={actionBtn}>Editar</button>
                    <button onClick={() => handleExcluir(venda.id)} style={actionBtnDelete}>Excluir</button>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
      {modalVendaId && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3>Cancelar venda?</h3>
            <p>Deseja realmente cancelar esta venda?</p>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 16 }}>
              <button onClick={() => handleCancelarVenda(modalVendaId)} style={{ ...actionBtn, background: '#e53935', color: '#fff' }}>Sim, cancelar</button>
              <button onClick={() => setModalVendaId(null)} style={actionBtn}>Não</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Venda;
