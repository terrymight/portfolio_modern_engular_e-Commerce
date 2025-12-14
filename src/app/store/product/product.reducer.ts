import { createReducer, on } from '@ngrx/store';
import { initialState } from '../../models/product/product.model';
import * as ProductActions from './product.actions';

export const ProductReducer = createReducer(
  initialState,

  // Loading
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    items: products
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Filters
  on(ProductActions.setFilters, (state, { filters }) => ({
    ...state,
    filters,
    pagination: {
      ...state.pagination,
      currentPage: 1 // reset to first page when filters change
    }
  })),

  // Pagination
  on(ProductActions.setPage, (state, { page }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: page
    }
  })),

  on(ProductActions.setPageSize, (state, { size }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      itemsPerPage: size,
      currentPage: 1
    }
  })),

  // CRUD success
  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...state,
    items: [product, ...state.items]
  })),
  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    items: state.items.map((i) => (i.id === product.id ? product : i))
  })),
  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((i) => i.id !== id)
  })),

  // API Failure
  on(ProductActions.apiCallFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(ProductActions.loadProductsById, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedProduct: null
  })),

  on(ProductActions.loadProductByIdSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    selectedProduct: product
  })),

  on(ProductActions.loadProductByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    selectedProduct: null
  }))
);
