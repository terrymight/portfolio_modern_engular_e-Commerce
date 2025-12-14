import { Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';

export const productRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component')
        .then(m => m.LoginComponent)
    },
    {
        path: '',
        loadComponent: () => import('./products/products')
        .then(m => m.Products )
    },
    {
        path: 'user-management',
        canActivate:[AuthGuard],
        loadComponent: () => import('./user/user.component')
        .then(m => m.UserComponent )
    },
    {
        path: 'dashboard',
        canActivate:[AuthGuard],
        loadComponent: () => import('./dashboard/dashboard.component')
        .then(m => m.DashboadComponent )
    },
    {
        path: 'single-product/:productId',
        loadComponent: () => import('./productById/productById.component')
        .then(m => m.SingleProductComponent )
    },
];