import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../service/products/products.service";
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap, of, switchMap } from "rxjs";

@Injectable()
export class ProductEffects {
    private actions$ = inject(Actions);
    private productService = inject(ProductService);

    // Effect for loading all products
    loadProducts$ = createEffect( () =>
        this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            // We are fetching all data to handle client-side filtering/pagination
            switchMap(() => 
                this.productService.getProducts(0, 200).pipe(
                    map(products => ProductActions.loadProductsSuccess({ products })),
                    catchError((error:any) => of(ProductActions.loadProductsFailure({ error })) )
                )
            )
        ),
    );

    // Effect for creating a product
    addProduct$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProductActions.addProduct),
            mergeMap(action => 
                this.productService.createProduct(action.productDto).pipe(
                    map(product => ProductActions.addProductSuccess({ product })),
                    catchError(error => of(ProductActions.apiCallFailure({ error })) )
                ),
            ),
        )
    );

    // Effect for updating a product
    updateProduct$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            mergeMap(action => 
                this.productService.updateProduct(action.id, action.changes).pipe(
                    map(product => ProductActions.updateProductSuccess({ product })),
                    catchError(error => of(ProductActions.apiCallFailure({ error })))
                ),
            ),
        ),
    );
    
    // Effect for deleting a product
    deleteProduct$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProductActions.deleteProduct),
            mergeMap(action => 
                this.productService.deleteProduct(action.id).pipe(
                    map(() => ProductActions.deleteProductSuccess({ id: action.id })),
                    catchError(error => of(ProductActions.apiCallFailure({ error })))
                ),
            ),
        ),
    );

    // Effect for getting a product
    loadProductById$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProductActions.loadProductsById),
            switchMap(action => 
                this.productService.getProductById(action.id).pipe(
                    map(product => 
                        ProductActions.loadProductByIdSuccess({ product: product }),
                        catchError(error => of(ProductActions.loadProductByIdFailure({ error: error })))
                    )
                ),
            )
        )
    );
}