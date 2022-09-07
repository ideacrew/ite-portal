import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { ConfigService } from '@dbh/api-config';
import { Router } from '@angular/router';

interface TokenResponse {
  session: SessionObject;
}

interface SessionObject {
  jwt: string;
  email: string;
}

export interface TokenObject {
  exp: number;
  iss: string;
  auth_token: string;
  dbh_user: boolean;
  provider: boolean;
  provider_gateway_identifier: string | null;
  provider_id: string | null;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  token!: string;

  get decodedToken(): TokenObject {
    return this.token
      ? jwt_decode<TokenObject>(this.token)
      : ({} as TokenObject);
  }

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private router: Router
  ) {}

  login({ email, password }: { email: string; password: string }): void {
    this.http
      .post<TokenResponse>(
        // Url to post to
        `${this.config.baseApiUrl}/session`,
        // body of the payload, here sending the entire form value
        { email, password }
      )
      .pipe(
        tap((response: TokenResponse) => {
          this.token = response.session.jwt;
        })
      )
      .subscribe({
        complete: () => {
          console.log('Login complete, what next?');
          void this.router.navigate(['/']);
        },
      });
  }
}
