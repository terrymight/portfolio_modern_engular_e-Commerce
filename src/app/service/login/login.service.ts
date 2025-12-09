import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError, from, map, mapTo, Observable, tap, throwError } from "rxjs";
import { LoginData, loginResponse, RegisterRequest, User } from "../../models/Login/LoginData.mode";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;
    private route = inject(Router);

    /**
     * [POST] /login
     */
    login(payload: LoginData):Observable<User> {
        return this.http.post<loginResponse>(`${this.apiUrl}/auth/login`, payload)
        
    }

    register(data: RegisterRequest): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, data);
    }

    forgotPassword(email: string): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.apiUrl}/forgot-password`, { email });
    }

    refreshTokenApi(refreshToken: string):Observable<any> {
        return this.http.post<User>(`${this.apiUrl}/auth/refresh-token`, refreshToken);
    }

    logout(): Observable<void> {
    // clear tokens / app storage first
    try {
      localStorage.removeItem('login-details');
      // other cleanup if needed:
      // localStorage.removeItem('some-other-key');
    } catch (err) {
      // swallow storage errors (optional) — still attempt navigation
      console.error('Failed to clear localStorage on logout', err);
    }

    // convert the Router.navigate promise to an Observable
    return from(this.route.navigate(['/login'])).pipe(
      // Router.navigate resolves to true/false; we map to void
      mapTo(void 0),
      catchError((err) => {
        // optional: you already cleared storage; propagate the navigation error
        console.error('Navigation to /login failed', err);
        return throwError(() => err);
      })
    );
  }

}