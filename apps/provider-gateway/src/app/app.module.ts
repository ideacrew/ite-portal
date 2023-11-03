/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
const readScope = `https://${subdomain}.onmicrosoft.com/provider-api/provider.read`;
const gatewayApiUrl = environment.NX_GATEWAY_API || '';
const portalApiUrl = environment.NX_PORTAL_API || '';

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
  console.log('Making sure correct branch by subdomain: ' + subdomain);
  console.log('Making sure correct branch by gatewayCid: ' + gatewayCid);
  return new PublicClientApplication({
    auth: {
      clientId: `${gatewayCid}`,
      authority: b2cPolicies.authorities.signUpSignIn.authority,
      knownAuthorities: [b2cPolicies.authorityDomain],
      redirectUri: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
  });
}

export function msalGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    loginFailedRoute: './',
    authRequest: {
      scopes: [readScope],
    },
  };
}

export function msalInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, string[]>();
  protectedResourceMap.set(gatewayApiUrl, [readScope]);
  protectedResourceMap.set(portalApiUrl, [readScope]);
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
          path: '**',
          redirectTo: 'provider-gateway/login',
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
      useFactory: msalGuardConfigFactory,
    },
    MsalService,
    MsalGuard,
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: msalInterceptorConfigFactory,
    },
    {
      provide: APP_TITLE,
      useValue: 'Provider Gateway',
    },
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
