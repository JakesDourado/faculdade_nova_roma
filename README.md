# Sistema Administrativo - Faculdade Nova Roma

Este projeto é um sistema administrativo completo, desenvolvido em React com backend simulado via JSON Server. Possui controle de acesso por perfil (administrador e funcionário), cadastro e gestão de categorias, produtos, usuários, fornecedores, clientes e vendas.

## Requisitos do sistema

- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes do Node, geralmente já vem com o Node.js)
- **Git** (para clonar o repositório)
- **Navegador moderno** (Google Chrome, Firefox, Edge, etc.)

### Bibliotecas e ferramentas utilizadas
- [React](https://react.dev/) (frontend)
- [Vite](https://vitejs.dev/) (build e dev server)
- [React Router DOM](https://reactrouter.com/) (roteamento SPA)
- [JSON Server](https://github.com/typicode/json-server) (API fake para persistência dos dados)

## Passo a passo para rodar o projeto

### 1. Baixar o projeto

Clone o repositório do GitHub:
```sh
git clone https://github.com/JakesDourado/faculdade_nova_roma.git
cd faculdade_nova_roma
```

### 2. Instalar as dependências

Instale as bibliotecas necessárias:
```sh
npm install
```

### 3. Atualizar o projeto (opcional)

Para atualizar o projeto com as últimas mudanças do repositório:
```sh
git pull origin main
```

### 4. Iniciar o servidor (backend) e o frontend

O comando abaixo inicia o JSON Server (porta 3001) e o frontend React (porta 5173):
```sh
npm start
```

- Acesse o sistema em: [http://localhost:5173](http://localhost:5173)
- O backend (JSON Server) estará rodando em: [http://localhost:3001](http://localhost:3001)

### 5. Logins de exemplo

- **Administrador**
  - Email: `admin@example.com`
  - Senha: `admin123`
- **Funcionário**
  - Email: `funcionario@example.com`
  - Senha: `func123`

---

Se precisar de mais instruções ou encontrar algum problema, abra uma issue no repositório ou entre em contato com o responsável pelo projeto.
