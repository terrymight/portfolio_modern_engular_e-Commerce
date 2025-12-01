import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ProductReducer } from './store/product/product.reducer';
import { ProductEffects } from './store/product/product.effects';
import { UserReducer } from './store/users/user.reducer';
import { UserEffects } from './store/users/user.effects';

import Aura from '@primeuix/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),

    // Root store: NO reducer here
    provideStore(),

    // Feature state "products"
    provideState('products', ProductReducer),
    provideState('users', UserReducer),

    // Effects
    provideEffects(ProductEffects, UserEffects),

    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    })
  ],
};
