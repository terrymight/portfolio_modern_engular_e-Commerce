import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError, map, Observable, tap, throwError } from "rxjs";
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

    /**
     * Clear local storage
     */
    logout() {
        localStorage.clear();
        this.route.navigate(['/login'])
    }

}