import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { LoginData, loginResponse } from "../../models/Login/LoginData.mode";
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
    login(payload: LoginData):Observable<any> {
        return this.http.post<loginResponse>(`${this.apiUrl}/auth/login`, payload)
        .pipe(
         // persist the whole loginResponse
        tap((response: loginResponse) => {
            try {
            localStorage.setItem('login-details', JSON.stringify(response));
            } catch (err) {
            // handle quota / storage errors — do not swallow original response
            console.error('Failed to save login details to localStorage', err);
            }
        }),
        map((response: loginResponse) => response),
        catchError((error: HttpErrorResponse) => {            
            // normalize the error for the rest of your app
            const normalized = {
            status: error.status,
            // server message if present
            message: error.error?.message ?? error.message ?? 'Login failed',
            };
            // rethrow as an observable error
            return throwError(() => normalized);
        })
        );
    }

    /**
     * Clear local storage
     */
    logout() {
        localStorage.clear();
        this.route.navigate(['/login'])
    }

}