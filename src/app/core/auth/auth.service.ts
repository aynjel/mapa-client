import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { LoginPayloadTypes } from './types/LoginPayload.types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserTypes } from '../../shared/types/User.types';
import { RegisterPayloadTypes } from './types/RegisterPayload.types';
import { RegisterResponseTypes } from './types/RegisterResponse.types';
import { LoginResponseTypes } from './types/LoginResponse.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  login(payload: LoginPayloadTypes): Observable<LoginResponseTypes> {
    return this.http.post<LoginResponseTypes>(
      `${this.apiUrl}/users/login`,
      payload
    );
  }

  register(payload: RegisterPayloadTypes): Observable<RegisterResponseTypes> {
    return this.http.post<RegisterResponseTypes>(
      `${this.apiUrl}/users/signup`,
      payload
    );
  }

  getCurrentUser(): Observable<UserTypes> {
    return this.http.get<UserTypes>(`${this.apiUrl}/users/current`);
  }
}
