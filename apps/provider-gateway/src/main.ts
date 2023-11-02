import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const gatewayApiUrl = environment.NX_GATEWAY_API || '';
const portalApiUrl = environment.NX_PORTAL_API || '';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((error) => console.error(error));
