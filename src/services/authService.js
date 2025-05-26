// Serviço de autenticação para login
export async function login(email, password) {
  const res = await fetch(`http://localhost:3001/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
  const users = await res.json();
  if (users.length > 0) {
    // Retorna o usuário autenticado (inclui role)
    return users[0];
  }
  return null;
}

export function logout() {
  localStorage.removeItem('user');
}

export function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}
