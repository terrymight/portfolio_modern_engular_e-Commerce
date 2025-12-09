import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { TokenService } from '../../service/tokens/tokens.service';
import { AuthActions } from '../../store/login/login.actions';
import { Store } from '@ngrx/store';
import { LoginService } from '../../service/login/login.service';
let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

export const tokenRefreshInterceptor: HttpInterceptorFn =(
    request: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const tokenService = inject(TokenService);
    const accessToken = tokenService.getToken('access_token');
    const store = inject(Store);
    const loginService = inject(LoginService);

    const requestWithToken = addTokenHeader(request, accessToken);

  return next(requestWithToken).pipe(
    catchError((error: HttpErrorResponse) => {
      if (accessToken && error.status === 401) {
        return handle401Error(request, next, tokenService, loginService, store);
      }
      return throwError(() => error);
    })
  );
};

function addTokenHeader(request: HttpRequest<unknown>, token: string | null) {
  return token ? request.clone({ 
    setHeaders: { Authorization: `Bearer ${token}` } 
  }) : request;
}

function handle401Error(
    request: HttpRequest<unknown>, 
    next: HttpHandlerFn, 
    tokenService: TokenService, // <-- FIX: Added TokenService argument
    loginService: LoginService, // <-- FIX: Changed authService to loginService
    store: Store // <-- FIX: Added Store argument
): Observable<HttpEvent<unknown>> {
    
    // FIX 3: Removed duplicate inject(TokenService) as it's passed in
    
    if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null);
        
        const refreshToken = tokenService.getToken('refresh_token'); 

        if (refreshToken) {
            // FIX 4: Use loginService (the injected dependency)
            return loginService.refreshTokenApi(refreshToken).pipe( 
                switchMap((tokenResponse) => {
                    isRefreshing = false;
                    
                    // FIX 5: Action Payload Mismatch
                    // loginSuccess expects { user, accessToken, refreshToken }
                    // tokenResponse (loginResponse) contains all these properties.
                    // Assuming tokenResponse = { user, access_token, refresh_token }
                    store.dispatch(AuthActions.loginSuccess({ 
                        user: tokenResponse.user,
                        access_token: tokenResponse.access_token,
                        refresh_token: tokenResponse.refresh_token
                    }));
                    
                    // The rest of the logic looks correct for handling the new token
                    refreshTokenSubject.next(tokenResponse.access_token); 
                    
                    return next(addTokenHeader(request, tokenResponse.access_token));
                }),
                catchError((err) => {
                    isRefreshing = false;
                    store.dispatch(AuthActions.logout()); 
                    return throwError(() => err);
                })
            );
        } else {
            // If no refresh token exists, force logout
            store.dispatch(AuthActions.logout()); 
            return throwError(() => new Error('No refresh token found.'));
        }
    }

    // ... rest of the queueing logic is correct ...
    return refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next(addTokenHeader(request, token)))
    );
}
