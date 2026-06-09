import type { AuthResponse, LoginDto } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export const authService = {
  async login(dto: LoginDto): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message ?? 'Đăng nhập thất bại');
    }

    return res.json();
  },

  saveTokens(data: AuthResponse, remember: boolean) {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('access_token', data.access_token);
    storage.setItem('refresh_token', data.refresh_token);
    storage.setItem('user', JSON.stringify(data.user));
  },

  getAccessToken(): string | null {
    return localStorage.getItem('access_token') ?? sessionStorage.getItem('access_token');
  },

  getUser() {
    const raw = localStorage.getItem('user') ?? sessionStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('user');
  },
};