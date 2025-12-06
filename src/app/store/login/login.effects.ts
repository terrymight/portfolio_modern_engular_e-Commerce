import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginService } from "../../service/login/login.service";
import { AuthActions } from './login.actions';
import { catchError, map, of, switchMap, tap } from "rxjs";

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
                map((user) => AuthActions.loginSuccess({ user })),
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
        tap((action) => {
             localStorage.setItem('login-details', JSON.stringify(action.user));
            this.route.navigate(['/dashboard'])
        })
    ), { dispatch: false });

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
}