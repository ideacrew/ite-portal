import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {
  MsalModule,
  MsalService,
  MsalGuard,
  MsalInterceptor,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptorConfiguration,
  MsalRedirectComponent,
  MSAL_INSTANCE,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
} from '@azure/msal-angular';
import {
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  IPublicClientApplication,
  BrowserUtils,
  LogLevel,
} from '@azure/msal-browser';

import { APP_TITLE } from '@dbh/theme';
import { RootStoreModule } from '@dbh/shared/state/root-store';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LastActiveService } from './services/last-active.service';
import { OurAuthService } from './services/auth.service';

// const readScope = `https://${environment.subdomain}.onmicrosoft.com/provider-api/provider.read`;

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message); // Uncomment to see MSAL logs
}

export function MSALInstanceFactory(): IPublicClientApplication {
  // console.log(
  //   'Making sure correct branch by subdomain: ' + environment.subdomain
  // );
  // console.log(
  //   'Making sure correct branch by gatewayCid: ' + environment.clientId
  // );
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      authority: environment.msalConfig.auth.authority,
      knownAuthorities: [environment.msalConfig.auth.authorityDomain],
      redirectUri: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker

      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Warning,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {},
    loginFailedRoute: '/login-failed',
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  // protectedResourceMap.set(gatewayApiUrl, [readScope]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MsalModule,
    RouterModule.forRoot(
      [
        {
          path: 'provider-gateway',
          canActivate: [MsalGuard],
          loadChildren: () =>
            import('@dbh/provider-gateway/shell').then(
              (m) => m.ProviderGatewayShellModule
            ),
        },
        {
          path: 'provider-gateway/login',
          loadComponent: () =>
            import('@dbh/provider-gateway/login').then(
              (x) => x.ProviderGatewayLoginComponent
            ),
        },
        {
          path: 'login-failed',
          loadComponent: () =>
            import('./components/login-failed.component').then(
              (x) => x.LoginFailedComponent
            ),
        },

        {
          path: '**',
          redirectTo: 'provider-gateway',
          pathMatch: 'full',
        },
      ],
      {
        initialNavigation:
          !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
            ? 'enabledNonBlocking'
            : 'disabled', // Set to enabledBlocking to use Angular Universal
      }
    ),
    RootStoreModule,
  ],
  providers: [
    {
      provide: APP_TITLE,
      useValue: 'Provider Gateway',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [LastActiveService],
      useFactory: (lastActiveService: LastActiveService) => () =>
        lastActiveService.setUp(),
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [OurAuthService],
      useFactory: (authService: OurAuthService) => () => authService.setUp(),
    },
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
