import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { UserDataSource } from '../shared/types/user.types';

export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const source = window.localStorage.getItem('user');
    if (!source) {
      return next.handle(request);
    }

    const userData = JSON.parse(source) as UserDataSource;
    const token = userData.token;

    const updatedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(updatedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('Unauthorized');
        } else if (error.status === 403) {
          console.log('Forbidden');
        }

        return throwError(() => error);
      })
    );
  }
}
