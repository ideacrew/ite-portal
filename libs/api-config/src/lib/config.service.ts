import { Injectable } from '@angular/core';
import { environment } from '@dbh/ite/env';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  gatewayApiUrl: string = environment.NX_GATEWAY_API || '';
  portalApiUrl: string = environment.NX_PORTAL_API || '';
}
