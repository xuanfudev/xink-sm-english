import api from './api';

// Login via API (XinKEdu-compatible)
// Accepts { email, password } or { username, password } and returns { user, token }
export async function loginApi({ email, username, password }) {
  // Endpoint path can be configured via VITE_AUTH_LOGIN_PATH (optional)
  const path = import.meta.env.VITE_AUTH_LOGIN_PATH || '/auth/login';

  // Prefer email like XinKEdu; fallback to username
  const payload = email ? { email, password } : { username, password };
  const { data } = await api.post(path, payload);

  // Support multiple shapes from backend
  const token = data?.token || data?.accessToken || data?.access_token || '';
  const user = data?.user ||
    data?.data || {
      id: data?.id,
      username: data?.username || username,
      email: data?.email || email,
      name: data?.name || data?.fullName,
      role: data?.role,
    };

  return { user, token };
}

export function saveAuth({ user, token }) {
  if (token) localStorage.setItem('token', token);
  if (user) localStorage.setItem('user', JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
