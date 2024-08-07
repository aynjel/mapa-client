import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import type {
  CurrentUserResponse,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  RegisterPayload,
  RegisterResponse,
} from '@core/types/auth.types';
import { environment } from '@env/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = environment.apiUrl;

  login(loginPayload: LoginPayload): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${this.API_URL}/auth/login`,
      loginPayload
    );
  }

  register(registerPayload: RegisterPayload): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(
      `${this.API_URL}/users/create`,
      registerPayload
    );
  }

  getCurrentUser(): Observable<CurrentUserResponse> {
    return this.httpClient.get<CurrentUserResponse>(
      `${this.API_URL}/auth/current`
    );
  }

  logout(): Observable<LogoutResponse> {
    return this.httpClient.get<LogoutResponse>(`${this.API_URL}/auth/logout`);
  }
}
