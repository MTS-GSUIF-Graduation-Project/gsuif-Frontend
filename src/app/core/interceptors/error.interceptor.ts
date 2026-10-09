import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const notifications = inject(NotificationService);
  const router = inject(Router);

  return next(request).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401 && !isLoginRequest(request.method, request.url)) {
        auth.clearSession();
        notifications.show(error.error?.clientMessage || 'Your session has expired. Sign in again.');
        void router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};

function isLoginRequest(method: string, url: string): boolean {
  return method.toUpperCase() === 'POST' && url.endsWith('/api/auth/login');
}
