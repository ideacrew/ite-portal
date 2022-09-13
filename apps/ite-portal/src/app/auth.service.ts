import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { ConfigService } from '@dbh/api-config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
  provider_name: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token!: string;

  get decodedToken(): TokenObject {
    return this.token
      ? jwt_decode<TokenObject>(this.token)
      : ({} as TokenObject);
  }

  get rawToken(): string {
    return this.token;
  }

  get email(): string {
    return this.decodedToken.email;
  }

  get providerGatewayId(): string {
    return this.decodedToken.provider_gateway_identifier ?? '000';
  }

  get providerId(): string {
    return this.decodedToken.provider_id ?? '000';
  }

  get isProvider(): boolean {
    return this.decodedToken.provider;
  }

  get isDBHUser(): boolean {
    return this.decodedToken.dbh_user;
  }

  get providerName(): string {
    return this.decodedToken.provider_name ?? 'Unknown';
  }

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private router: Router
  ) {
    const tokenFromStorage = this.getJwt();
    if (tokenFromStorage) {
      this.token = tokenFromStorage;
    }
  }

  clearJwt(): void {
    localStorage.removeItem('__jwt_authorization_current_token');
  }

  setJwt(currentToken: string): void {
    localStorage.setItem('__jwt_authorization_current_token', currentToken);
  }

  getJwt(): string | null {
    const currentToken = localStorage.getItem(
      '__jwt_authorization_current_token'
    );

    return currentToken;
  }

  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<unknown> {
    return this.http
      .post<TokenResponse>(
        // Url to post to
        `${this.config.baseApiUrl}/session`,
        // body of the payload, here sending the entire form value
        { email, password }
      )
      .pipe(
        tap((response: TokenResponse) => {
          this.token = response.session.jwt;
          this.setJwt(response.session.jwt);
          void this.router.navigate(['/submissions']);
        })
      );
  }

  logout(): void {
    this.http.delete(`${this.config.baseApiUrl}/session`).subscribe({
      complete: () => {
        this.clearJwt();
        void this.router.navigate(['/login']);
      },
    });
  }

  resetPassword({
    current_password,
    password,
    password_confirmation,
  }: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }): Observable<unknown> {
    return this.http.put(
      // Url to post to
      `${this.config.baseApiUrl}/user/password`,
      // body of the payload, here sending the entire form value
      { current_password, password, password_confirmation }
    );
  }
}
