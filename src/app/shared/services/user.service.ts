import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserListResponse, UserResponse } from '../types/user.types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${environment.base_url}/api/users`);
  }

  getUserById(userId: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${environment.base_url}/api/users/${userId}`
    );
  }
}
