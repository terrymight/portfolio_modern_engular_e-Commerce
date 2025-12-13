import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginService } from "../../service/login/login.service";
import { AuthActions } from './login.actions';
import { catchError, EMPTY, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class AuthEffect {
    private route = inject(Router);
    private action$ = inject(Actions);
    private loginService = inject(LoginService)

    // Login Effect
    login$ =createEffect(() => this.action$.pipe(
        ofType(AuthActions.login),
        switchMap(({ request }) => 
            this.loginService.login(request).pipe(
                map((user) => AuthActions.loginSuccess({ 
                    user: user,
                    access_token: user.access_token,
                    refresh_token: user.refresh_token
                })),
                catchError((error) => {
                    const errorMessage = error.error?.message || 'Invalid Credentials'
                    return of(AuthActions.loginFailure({ error: errorMessage }))
                })
            )
        ),
    ));

    // Redirect on Login Success (Optional but common)
    loginSuccess$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess), 
        // ofType(AuthActions.loginSuccess, AuthActions.registerSuccess, AuthActions.localStorageSuccess), 
        tap(() => {
            //console.log(AuthActions.localStorageSuccess)
            this.route.navigate(['/dashboard'])
        })
    ), { dispatch: false });

    saveTokens$ = createEffect(() => this.action$.pipe(
        // Listen for any action that provides valid tokens
        ofType(AuthActions.loginSuccess, AuthActions.refreshTokenSuccess), 
        tap((action) => {
            // Save tokens to persistent storage
            localStorage.setItem('access_token', action.access_token);
            localStorage.setItem('refresh_token', action.refresh_token);
        })
    ), { dispatch: false, useEffects: true }); // useEffects: true is optional but good for side effects

    // Register Effect
    register$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.register),
        switchMap(({ request }) => 
            this.loginService.register(request).pipe(
                map((user) => AuthActions.registerSuccess({ user })),
                catchError((error) => {
                    const errorMessage = error.error?.message || 'Registration failed';
                    return of(AuthActions.registerFailure({ error: errorMessage }))
                })
            )
        )
    ))

    // Forgot Password Effect
    forgetPassword$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.forgetPassword),
        switchMap(({ email }) => 
            this.loginService.forgotPassword(email).pipe(
                map((response) => AuthActions.forgetPasswordSuccess({ message: response.message })),
                catchError((error) => {
                const errorMessage = error.error?.message || 'Request failed';
                return of(AuthActions.forgetPasswordFailure({ error: errorMessage }));
        }),
            ),
        ),
    ));

    // Logout 
    logout$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.logout),
        // Perform cleanup side effects (API/Storage clear)
        switchMap(() => this.loginService.logout().pipe(
            // Always succeed in the UI flow, even if the API logout fails
            map(() => AuthActions.logoutConfirmed()),
            catchError(() => of(AuthActions.logoutConfirmed())) // Ensure state updates even on network error
        ))
    ));

    // Confirm logout
    logoutConfirmed$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.logoutConfirmed, AuthActions.refreshTokenFailure),
        tap(() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            this.route.navigate(['/login']);
        })
    ), { dispatch: false });

    loadTokens$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.checkLocalStorage), // Triggered manually on app start
        switchMap(() => {
            const accessToken = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token');

            if (accessToken && refreshToken) {
                // If tokens exist, restore them to the store
                return of(AuthActions.localStorageSuccess({ 
                    access_token: accessToken, 
                    refresh_token: refreshToken 
                }));
            }
return EMPTY;
            // eturn of(AuthActions.logoutConfirmed()); // No tokens found, ensure state is clean
        })
    ));
}