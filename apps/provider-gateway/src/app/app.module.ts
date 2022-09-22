import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {
  AuthGuard,
  AuthInterceptor,
  AuthModule,
  LogInComponent,
} from '@dbh/auth';
import { APP_TITLE } from '@dbh/theme';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    RouterModule.forRoot(
      [
        {
          path: 'login',
          component: LogInComponent,
        },
        {
          path: 'provider-gateway',
          loadChildren: () =>
            import('@dbh/provider-gateway/shell').then(
              (m) => m.ProviderGatewayShellModule
            ),
          canLoad: [AuthGuard],
        },
        {
          path: '**',
          redirectTo: 'provider-gateway',
          pathMatch: 'full',
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_TITLE,
      useValue: 'Provider Gateway',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
