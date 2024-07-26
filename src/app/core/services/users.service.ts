import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment.development';
import type { UserProfile } from '@core/types/user.types';
import type { ApiResponse } from '@shared/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly httpClient = inject(HttpClient);

  private readonly API_URL = environment.apiUrl;

  getUsers(): Observable<ApiResponse<UserProfile>[]> {
    return this.httpClient.get<ApiResponse<UserProfile>[]>(
      `${this.API_URL}/users`
    );
  }

  getUser(): Observable<ApiResponse<UserProfile>> {
    return this.httpClient.get<ApiResponse<UserProfile>>(
      `${this.API_URL}/users/current`
    );
  }

  createUser(user: Omit<UserProfile, 'id'>): Observable<ApiResponse<UserProfile>> {
    return this.httpClient.post<ApiResponse<UserProfile>>(
      `${this.API_URL}/users`,
      user
   );
  }
}
