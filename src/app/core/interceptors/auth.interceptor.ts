import type {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const updatedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${cookieService.get('token')}`,
    },
  });

  return next(updatedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/login']);
      } else if (error.status === 403) {
        router.navigate(['/forbidden']);
      }

      return throwError(() => error);
    })
  );
};
