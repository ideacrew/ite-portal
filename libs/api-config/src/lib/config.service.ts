import { Injectable } from '@angular/core';
import { environment } from '@dbh/ite/env';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  gatewayApiUrl: string = environment.gatewayApi || '';
  portalApiUrl: string = environment.portalApi || '';
}
