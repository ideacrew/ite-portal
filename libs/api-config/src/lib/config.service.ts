import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  gatewayApiUrl: string =
    process.env['NX_GATEWAY_API'] || 'https://api-provider.dbh.dc.gov';
  portalApiUrl: string =
    process.env['NX_PORTAL_API'] || 'https://api-portal.dbh.dc.gov';
}
