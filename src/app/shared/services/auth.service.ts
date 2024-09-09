import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload, LoginResponse } from '../types/api/login.types';
import { environment } from '../../../environments/environment';
import { RegisterPayload, RegisterResponse } from '../types/api/register.types';
import { CurrentUserResponse, LogoutResponse } from '../types/user.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginPayload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.base_url}/api/auth/login`,
      loginPayload
    );
  }

  register(registerPayload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${environment.base_url}/api/users/create`,
      registerPayload
    );
  }

  getCurrentUser(): Observable<CurrentUserResponse> {
    return this.http.get<CurrentUserResponse>(
      `${environment.base_url}/api/auth/current`
    );
  }

  logout(): Observable<LogoutResponse> {
    return this.http.get<LogoutResponse>(
      `${environment.base_url}/api/auth/logout`
    );
  }
}
