import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "../../models/product/product.model";

export const selectProductState = createFeatureSelector<ProductState>('products');

// Basic Selectors
export const selectAllProducts = createSelector(selectProductState, (state) => state.items);
export const selectPagination = createSelector(selectProductState, (state) => state.pagination);
export const selectFilters = createSelector(selectProductState, (state) => state.filters);

// Filter Logic (Category + Date Range)
export const selectFilteredProducts = createSelector(
    selectAllProducts, 
    selectFilters,
    (products, filters) => {
        return products.filter(products => {
            // Category Filter
            if (filters.categoryId && products.category.id !== filters.categoryId) {
                return false;
            }

            const productDate = new Date(products.creationAt).getTime();

            // Date Range: Start
            if (filters.startDate) {
                const start = new Date(filters.startDate).getTime();
                if (productDate < start) return false;
            }

            if (filters.endDate) {
                const end = new Date(filters.endDate).getTime();
                // Set end date to end of day to be inclusive
                const endDay = new Date(filters.endDate);
                endDay.setHours(23, 59, 59); 
                if (productDate > endDay.getTime()) return false;
            }

            if (filters.searchQuery) {
              const q = filters.searchQuery.toLowerCase();
              const inTitle = products.title.toLowerCase().includes(q);
              const inDescription = products.description.toLowerCase().includes(q);
              if (!inTitle && !inDescription) return false;
            }

            return true;
        })
    }
)

// Pagination Logic (Slicing the Filtered List)
export const selectPaginatedProducts = createSelector(
  selectFilteredProducts,
  selectPagination,
  (filteredProducts, pagination) => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return {
      data: filteredProducts.slice(startIndex, endIndex),
      totalItems: filteredProducts.length,
      currentPage: pagination.currentPage,
      itemsPerPage: pagination.itemsPerPage,
      totalPages: Math.ceil(filteredProducts.length / pagination.itemsPerPage)
    };
  }
);

// Extract unique categories for the dropdown
export const selectCategories = createSelector(selectAllProducts, (products) => {
  const unique = new Map();
  products.forEach(p => unique.set(p.category.id, p.category));
  return Array.from(unique.values());
});

// Loading State
export const selectProductLoading = createSelector(
  selectProductState,
  (state) => state.loading
)