import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

// services
import { StorageService } from '@common/services/storage.service';
import { AuthService } from '../pages/auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    // private readonly notificationsService: NotificationsService,
    private readonly storageService: StorageService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addTokenToRequest(req))
      .pipe(
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse) {
            // 401 error
            if (error.status === 401) {
              if (this.authService.isAuthenticated) {
                this.authService.logout();
              }
            }

            // 403 error
            // TODO
            // if (error.status === 403) {
            //   this.notificationsService.showNotification({
            //     type: NotificationTypes.ERROR,
            //     message: 'Access Denied',
            //   });
            // }

            // 500 error
            // TODO
            // if (error.status >= 500) {
            //   this.notificationsService.showNotification({
            //     type: NotificationTypes.ERROR,
            //     message: 'Internal Server Error',
            //   });
            // }
          }

          return throwError(() => error);
        }),
      );
  }

  private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.storageService.getAccessToken();
    if (!token) {
      return request;
    }

    return request.clone({ setHeaders: { Authorization: `Bearer ${ token }` } });
  }

  // TODO: implement refresh token
}
