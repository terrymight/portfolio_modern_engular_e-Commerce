import { Routes } from '@angular/router';

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
        loadComponent: () => import('./user/user.component')
        .then(m => m.UserComponent )
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component')
        .then(m => m.DashboadComponent )
    },
];