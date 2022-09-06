import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { ConfigService } from '@dbh/api-config';

interface TokenResponse {
  session: SessionObject;
}

interface SessionObject {
  jwt: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  token!: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

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
      .subscribe();
  }
}
