/* eslint-disable @typescript-eslint/naming-convention */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AuthModule } from '@dbh/auth';

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
} from '@azure/msal-angular';
import {
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  IPublicClientApplication,
  BrowserUtils,
} from '@azure/msal-browser';

import { APP_TITLE } from '@dbh/theme';
import { RootStoreModule } from '@dbh/shared/state/root-store';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

const subdomain = environment.B2C_SUBDOMAIN || '';
const gatewayCid = environment.NX_GATEWAY_C_ID || '';

const isIE =
  window.navigator.userAgent.includes('MSIE ') ||
  window.navigator.userAgent.includes('Trident/');

const b2cPolicies = {
  names: {
    signIn: 'b2c_1_sign_in_1',
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${subdomain}.b2clogin.com/${subdomain}.onmicrosoft.com/b2c_1_sign_in_1`,
    },
  },
  authorityDomain: `${subdomain}.b2clogin.com`,
};

export function msalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: `${gatewayCid}`,
      authority: b2cPolicies.authorities.signUpSignIn.authority,
      knownAuthorities: [b2cPolicies.authorityDomain],
      redirectUri: environment.production
        ? window.location.origin
        : 'http://localhost:4201',
      postLogoutRedirectUri: environment.production
        ? window.location.origin
        : 'http://localhost:4201',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    loginFailedRoute: './',
    authRequest: {
      scopes: [
        `https://${subdomain}.onmicrosoft.com/provider-api/provider.read`,
      ],
    },
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, string[]>();
  protectedResourceMap.set('http://localhost:4001', [
    `https://${subdomain}.onmicrosoft.com/provider-api/provider.read`,
  ]);
  protectedResourceMap.set('https://provider.dev.dbhite.com/', [
    `https://${subdomain}.onmicrosoft.com/provider-api/provider.read`,
  ]);
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
    AuthModule,
    MsalModule,
    RouterModule.forRoot(
      [
        // {
        //   path: 'login',
        //   component: LogInComponent,
        // },

        {
          path: 'provider-gateway',
          canActivate: [MsalGuard],
          loadChildren: () =>
            import('@dbh/provider-gateway/shell').then(
              (m) => m.ProviderGatewayShellModule
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
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: msalInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    MsalService,
    MsalGuard,
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    {
      provide: APP_TITLE,
      useValue: 'Provider Gateway',
    },
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
