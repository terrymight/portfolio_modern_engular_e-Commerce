
export interface User {
  access_token: string;
  refresh_token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface loginResponse {
    access_token: string;
    refresh_token: string;
}

export interface loginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email:string;
  name: string;
  password: string;
  avatar: string;
}

export interface loginState {
  user: User | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

export const initialLoginState: loginState = {
  user: null,
  loading: false,
  error: null,
  message: null
}