export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: string | null;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
}