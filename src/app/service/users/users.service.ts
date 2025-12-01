import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateUserDto, UpdateUserDto, User } from '../../models/user/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;
    
    /**
   * [GET] /users
   * Fetches users with pagination parameters (offset/limit) for the backend.
   * Note: The filtering (category/date) is still done in the NgRx selectors as planned.
   */
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/users`)
    }

    /**
     * [POST] /users
     */
    createUser(user: CreateUserDto): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/users`, user);
    }

    /**
   * [PUT] /users/{id}
   */
  updateUser(id: number, changes: UpdateUserDto): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, changes);
  }

  /**
   * [DELETE] /user/{id}
   * The API returns `true` on success, which we handle.
   */
  deleteUser(id: number): Observable<boolean> {
    // The response is a boolean, so we specify boolean type
    return this.http.delete<boolean>(`${this.apiUrl}/users/${id}`);
  }
}