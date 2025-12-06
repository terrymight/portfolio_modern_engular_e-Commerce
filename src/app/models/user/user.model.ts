
export interface User {
  id: number;
  email: string;
  password?: string; // Assuming password might not always be returned or is sensitive
  name: string;
  role: 'customer' | string; // Assuming 'customer' is one possible role
  avatar: string;
  creationAt: string; // Typically a Date object in TS, but 'string' for ISO format received from API
  updatedAt: string; // Same as above
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface UpdateUserDto {
  name: string;
  email: string;
}

export interface UserFilter {
  name?: string;
  startDate?: Date;
  email?: string;
  endDate?: Date;
  role?: string;
  searchQuery?: string;
}

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number; // 5, 10, 20, 50, 100
}

export interface ServerError {
  // A general message (e.g., "Invalid credentials" or "Validation failed")
  globalMessage: string;
  // Field-specific validation messages: { "email": ["already taken"], "password": ["too short"] }
  fieldErrors: { [key: string]: string[] } | null;
}

export interface UserState {
  items: User[];
  loading: boolean;
  error: ServerError | null;
  pagination: PaginationConfig;
  filters: UserFilter;
}

export const initialUserState: UserState = {
  items: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    itemsPerPage: 10 // Default
  },
  filters: {},
};
