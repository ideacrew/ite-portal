import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'provider-gateway-shell',
          loadChildren: () =>
            import('@dbh/provider-gateway/shell').then(
              (m) => m.ProviderGatewayShellModule
            ),
        },
        {
          path: '',
          redirectTo: 'provider-gateway-shell',
          pathMatch: 'full',
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
