import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./layouts/enter-routes.routes')
        .then(m => m.entryRoutes)
    }
];
