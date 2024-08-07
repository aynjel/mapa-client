import type {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';

/**
 *
 *
 * @param {HttpInterceptorFn}
 * @param {CookieService}
 * @returns
 * @memberof AuthInterceptor
 * @description
 * This interceptor is used to add the token to the request header
 */
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const cookieService = inject(CookieService);

  const updatedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${cookieService.get('token')}`,
    },
  });

  return next(updatedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.log('Unauthorized');
      } else if (error.status === 403) {
        console.log('Forbidden');
      }

      return throwError(() => error);
    })
  );
};
