import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '../../service/toast/toast.service';
import { Store } from '@ngrx/store';
import { ProductState } from '../../models/product/product.model';
import * as ProductActions from '../../store/product/product.actions';
import * as ProductSeletors from '../../store/product/product.selectors';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule, RouterLink],
    selector: 'single-product',
    templateUrl: 'productById.component.html'
})

export class SingleProductComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private notify = inject(ToastService);
    private store = inject(Store<{ products: ProductState }>);
    mainImageSrc: string = '';

    selectedProduct$ = this.store.select(ProductSeletors.selectSelectedProduct);
    loading$ = this.store.select(ProductSeletors.selectProductLoading)
    
    ngOnInit() { 
        this.loadInitialProduct();
        this.selectedProduct$.subscribe(product => {
            if (product && product.images && product.images.length > 0) {
                this.mainImageSrc = product.images[0];
            }
        });
    }

    selectImage(imageUrl: string): void {
        this.mainImageSrc = imageUrl;
    }

    loadInitialProduct(): void {
        const productId = Number(this.route.snapshot.paramMap.get('productId'))

        if (!productId) {
            this.notify.error({summary: 'Error Occured', message: 'Invalid Product Id selected'})
        }

        this.store.dispatch(ProductActions.loadProductsById({id: productId }))

    }
}