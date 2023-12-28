/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '@dbh/api-config';
import { User } from './models';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private config: ConfigService, private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.config.gatewayApiUrl}/users/${id}`);
  }

  createUser(formValue: unknown): Observable<User> {
    return this.http.post<User>(
      `${this.config.gatewayApiUrl}/users/new`,
      formValue
    );
  }

  updateUser(id: string, formValue: unknown): Observable<User> {
    return this.http.post<User>(
      `${this.config.gatewayApiUrl}/users/${id}`,
      formValue
    );
  }
}
