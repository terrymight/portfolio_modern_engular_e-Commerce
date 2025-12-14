import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/product/product.actions';
import * as ProductSelectors from '../../store/product/product.selectors';
import {
  CreateProductDto,
  Product,
  ProductState,
  UpdateProductDto
} from '../../models/product/product.model';
import { CommonModule } from '@angular/common';

import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    FormsModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    DatePickerModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
  standalone: true
})
export class Products implements OnInit {
  private store = inject(Store<{ products: ProductState }>);

  viewData$ = this.store.select(ProductSelectors.selectPaginatedProducts);
  categories$ = this.store.select(ProductSelectors.selectCategories);
  loading$ = this.store.select(ProductSelectors.selectProductLoading);

  selectedCategoryId: number | null = null;
  startDate = '';
  endDate = '';
  searchQuery = '';
  pageSizeOptions = [5, 10, 20, 50, 100];
  mobileFiltersOpen:boolean = false;

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  // --- Filter Methods ---
  applyFilters() {
    this.store.dispatch(
      ProductActions.setFilters({
        filters: {
          categoryId: this.selectedCategoryId
            ? Number(this.selectedCategoryId)
            : undefined,
          startDate: this.startDate ? new Date(this.startDate) : undefined,
          endDate: this.endDate ? new Date(this.endDate) : undefined,
          searchQuery: this.searchQuery.trim() || undefined,
        }
      })
    );
  }

  addToCart(val: any){
    console.log(val)
  }

  resetFilters() {
    this.selectedCategoryId = null;
    this.startDate = '';
    this.endDate = '';
    this.searchQuery = '';

    this.store.dispatch(
      ProductActions.setFilters({ filters: {} })
    );
  }

  // --- Pagination Methods ---
  onPageChange(page: number) {
    this.store.dispatch(ProductActions.setPage({ page }));
  }

  onPageSizeChange(size: number) {
    this.store.dispatch(ProductActions.setPageSize({ size }));
  }

  // --- CRUD Methods ---
  deleteProduct(id: number) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(ProductActions.deleteProduct({ id }));
    }
  }

  createNewProduct() {
    // This should send a DTO, not a full Product with id
    const newProductDto: CreateProductDto = {
      title: 'New Created Product',
      price: 100,
      description: 'Test description',
      categoryId: 1,
      images: ['https://placehold.co/600x400']
    };

    this.store.dispatch(
      ProductActions.addProduct({ productDto: newProductDto })
    );
  }

  editProduct(product: Product) {
    const changes: UpdateProductDto = {
      title: product.title + ' (Edited)',
      price: 100,
      // add other fields if needed
    };

    this.store.dispatch(
      ProductActions.updateProduct({ id: product.id, changes })
    );
  }
}
