import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.rawToken;

    if (request.url.includes('https://dbh3-tableau.openhbx.org')) {
      return next.handle(request);
    }

    if (!request.headers.has('Authorization') && authToken) {
      // if (this.auth.inRefreshInterval) {
      //   this.auth.refresh();
      // }
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      });

      return next.handle(authRequest).pipe(
        // eslint-disable-next-line @typescript-eslint/require-await
        catchError(async (error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            console.log({ error });
            await this.auth.clearCredentialsAndGoToLogin();
          }

          throw new Error('Not authorized');
        })
      );
    }

    return next.handle(request);
  }
}
