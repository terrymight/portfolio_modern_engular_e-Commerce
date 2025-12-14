

// Interfaces for POST/PUT payloads
export interface CreateProductDto {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface UpdateProductDto {
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  images?: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string; // ISO Date string
  updatedAt: string;
}

export interface ProductFilter {
  categoryId?: number;
  startDate?: Date;
  endDate?: Date;
  searchQuery?: string;
}

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number; // 5, 10, 20, 50, 100
}

export interface ProductState {
  items: Product[];
  loading: boolean;
  pagination: PaginationConfig;
  filters: ProductFilter;
  error: any;
  selectedProduct: Product | null;
}

export const initialState: ProductState = {
  items: [],
  loading: false,
  pagination: {
    currentPage: 1,
    itemsPerPage: 10 // Default
  },
  filters: {},
  error: null,
  selectedProduct: null,
};