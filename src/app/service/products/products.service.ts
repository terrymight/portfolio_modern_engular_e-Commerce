import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateProductDto, Product, UpdateProductDto } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /**
   * [GET] /products
   * Fetches products with pagination parameters (offset/limit) for the backend.
   * Note: The filtering (category/date) is still done in the NgRx selectors as planned.
   */
  getProducts(offset: number = 0, limit: number = 20): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?offset=${offset}&limit=${limit}`);
  }

  /**
   * [GET] get a single product by adding the id as a parameter
   * @param productId product Id
   * @returns single product
   */
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${productId}`)
  }

  /**
   * [POST] /products
   */
  createProduct(product: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  /**
   * [PUT] /products/{id}
   */
  updateProduct(id: number, changes: UpdateProductDto): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, changes);
  }

  /**
   * [DELETE] /products/{id}
   * The API returns `true` on success, which we handle.
   */
  deleteProduct(id: number): Observable<boolean> {
    // The response is a boolean, so we specify boolean type
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
