import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TokenService {
    getToken(key:string): string | null{
        // Attempt to retrieve the JSON string stored under login-details
        const rawValue = localStorage.getItem('login-details');

        // If no data is found, return null
        if (!rawValue) return null;

        let values: Record<string, any> | null = null;

        try {
            values = JSON.parse(rawValue)
        } catch (error) {
            values = null;
        }

        if (values && key in values) {
            return values[key];
        }
        return null;
    }

    getAllToken<T = Record<string, any>>(): T | null {
        const raw = localStorage.getItem('login-details');
        if (!raw) return null;

        try {
            return JSON.parse(raw) as T;
        } catch (err) {
            console.error('Failed to parse login-details from localStorage', err);
            return null;
        }
    }
}