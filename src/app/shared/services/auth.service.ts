import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable } from 'rxjs';
import { LoginPayload } from '../types/api/login.types';
import { environment } from '../../../environments/environment';
import { RegisterPayload, RegisterResponse } from '../types/api/register.types';
import {
  CurrentUserResponse,
  LogoutResponse,
  UserDataSource,
} from '../types/user.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSource = new BehaviorSubject<UserDataSource | null>(null);
  current$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(loginPayload: LoginPayload): Observable<CurrentUserResponse> {
    return this.http
      .post<CurrentUserResponse>(
        `${environment.base_url}/api/auth/login`,
        loginPayload
      )
      .pipe(
        map((res: CurrentUserResponse) => {
          if (res) {
            const userData = res.data;
            window.localStorage.setItem('user', JSON.stringify(userData));
            this.getCurrentUser().subscribe();
          }
          return res;
        })
      );
  }

  register(registerPayload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${environment.base_url}/api/users/create`,
      registerPayload
    );
  }

  getCurrentUser(): Observable<CurrentUserResponse> {
    return this.http
      .get<CurrentUserResponse>(`${environment.base_url}/api/auth/current`)
      .pipe(
        map((res) => {
          if (res) {
            const userData = res.data;
            window.localStorage.setItem('user', JSON.stringify(userData));
            this.currentUserSource.next(userData);
          }
          return res;
        })
      );
  }

  logout(): Observable<LogoutResponse> {
    return this.http
      .get<LogoutResponse>(`${environment.base_url}/api/auth/logout`)
      .pipe(
        delay(2000),
        map((res) => {
          if (res) {
            window.localStorage.removeItem('user');
            this.currentUserSource.next(null);
          }
          return res;
        })
      );
  }
}
