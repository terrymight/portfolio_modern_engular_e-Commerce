import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { selectIsAuthenticated } from '../store/login/user.selectors';

export const AuthGuard: CanActivateFn = (): Observable<boolean> => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    // Ensure we only check the current state once
    take(1),
    map(isAuthenticated => {
      if (isAuthenticated) {
        // Access granted
        return true;
      } else {
        // Access denied, redirect to login page
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
