import { createAction, props } from "@ngrx/store";
import { CreateProductDto, Product, ProductFilter, UpdateProductDto } from "../../models/product/product.model";
// --- API / Data Loading ---
export const loadProducts = createAction('[Product API] Load Products');
export const loadProductsSuccess = createAction(
  '[Product API] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product API] Load Products Failure',
  props<{ error: any }>()
);

// --- CRUD Operations - Request Actions ---
export const addProduct = createAction(
  '[Product List] Add Product',
  props<{ productDto: CreateProductDto }>() // Use DTO for input
);
export const updateProduct = createAction(
  '[Product List] Update Product',
  props<{ id: number, changes: UpdateProductDto }>() // Pass ID and changes
);
export const deleteProduct = createAction(
  '[Product List] Delete Product',
  props<{ id: number }>()
);

// --- CRUD Operations - API Response Actions ---
export const addProductSuccess = createAction(
  '[Product API] Add Product Success',
  props<{ product: Product }>()
);
export const updateProductSuccess = createAction(
  '[Product API] Update Product Success',
  props<{ product: Product }>()
);
export const deleteProductSuccess = createAction(
  '[Product API] Delete Product Success',
  props<{ id: number }>()
);

// Generic Failure action for all CRUD operations
export const apiCallFailure = createAction(
  '[Product API] CRUD Operation Failure',
  props<{ error: any }>()
);


// --- Filters & Pagination ---
export const setFilters =  createAction(
    '[Product UI] Set Filter',
    props<{ filters: ProductFilter }>()
);

export const setPage = createAction(
  '[Product UI] Set Page',
  props<{ page: number }>()
);

export const setPageSize = createAction(
  '[Product UI] Set Page Size',
  props<{ size: number }>()
);