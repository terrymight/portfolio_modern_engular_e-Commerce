
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

export interface ServerError {
  // A general message (e.g., "Invalid credentials" or "Validation failed")
  globalMessage: string;
  // Field-specific validation messages: { "email": ["already taken"], "password": ["too short"] }
  fieldErrors: { [key: string]: string[] } | null;
}

export interface loginState {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  loading: boolean;
  error: ServerError | null;
  message: string | null;
}

export const initialLoginState: loginState = {
  user: null,
  loading: false,
  error: null,
  message: null,
  access_token: null,
  refresh_token: null,
}