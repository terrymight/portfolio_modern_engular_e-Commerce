import { Routes } from '@angular/router';

export const productRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./products/products')
        .then(m => m.Products )
    },
    {
        path: 'user-management',
        loadComponent: () => import('./user/user.component')
        .then(m => m.UserComponent )
    }
];