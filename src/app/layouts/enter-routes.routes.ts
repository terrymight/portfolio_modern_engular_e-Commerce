import { Routes } from '@angular/router';
import { AppBodyComponent } from "./body/body.component";

export const entryRoutes: Routes = [
    { 
        path: '',
        component: AppBodyComponent,
        children: [
            {
            path: '',
            loadChildren: () => import('../features/features.routes')
            .then(m => m.productRoutes)
            }
        ],
     },
]