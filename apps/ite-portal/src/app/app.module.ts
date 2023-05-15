/* eslint-disable @typescript-eslint/naming-convention */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TableauModule } from 'ngx-tableau';
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

import { DataAccessModule } from '@dbh/bhsd/data-access';
import { ClaimsDataAccessModule } from '@dbh/claims/data-access';
import { APP_TITLE } from '@dbh/theme';
import { BhsdUiModule } from '@dbh/bhsd/ui';
import { ProviderGuard } from '@dbh/providers/util';
import { SharedUiModule } from '@dbh/shared/ui';
import { AdUserProfileComponent } from '@dbh/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { PortalDashboardComponent } from './portal-dashboard/portal-dashboard.component';
import { FakePageComponent } from './fake-page/fake-page.component';
import { ExternalResourcesComponent } from './external-resources/external-resources.component';
import { AdjudicatedClaimsComponent } from './adjudicated-claims/adjudicated-claims.component';
import { SearchAndQueryComponent } from './search-and-query/search-and-query.component';
import { ClientSearchComponent } from './client-search/client-search.component';
import { ClaimSearchComponent } from './claim-search/claim-search.component';
import { AdvancedClaimSearchComponent } from './advanced-claim-search/advanced-claim-search.component';
import { DataGovernanceComponent } from './data-governance/data-governance.component';
import { BusinessGlossaryComponent } from './business-glossary/business-glossary.component';
import { DataTrackingSystemInventoryComponent } from './data-tracking-system-inventory/data-tracking-system-inventory.component';
import { IteDatabaseNamingConventionsComponent } from './ite-database-naming-conventions/ite-database-naming-conventions.component';
import { DataDictionaryComponent } from './data-dictionary/data-dictionary.component';

const isIE =
  window.navigator.userAgent.includes('MSIE ') ||
  window.navigator.userAgent.includes('Trident/');

export function msalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '1598f7c5-7284-42bd-9eda-969b58d49b99',
      authority:
        'https://login.microsoftonline.com/8fe449f1-8b94-4fb7-9906-6f939da82d73/',
      redirectUri: window.location.origin,
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
      scopes: ['api://1598f7c5-7284-42bd-9eda-969b58d49b99/Read'],
    },
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, string[]>();
  protectedResourceMap.set('http://localhost:4000', [
    'api://1598f7c5-7284-42bd-9eda-969b58d49b99/Read',
  ]);
  protectedResourceMap.set('http://localhost:4002', [
    'api://1598f7c5-7284-42bd-9eda-969b58d49b99/Read',
  ]);
  protectedResourceMap.set('https://bff-dev.dbh-ite.com', [
    'api://1598f7c5-7284-42bd-9eda-969b58d49b99/Read',
  ]);
  protectedResourceMap.set('https://portal-bff-dev.dbh-ite.com', [
    'api://1598f7c5-7284-42bd-9eda-969b58d49b99/Read',
  ]);
  protectedResourceMap.set('https://bff-uat.dbh-ite.com', [
    'api://1598f7c5-7284-42bd-9eda-969b58d49b99/Read',
  ]);
  protectedResourceMap.set('https://bff.dbh-ite.com', [
    'api://1598f7c5-7284-42bd-9eda-969b58d49b99/Read',
  ]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

const guards: any[] = environment.msalRedirect ? [MsalGuard] : [];

const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    canActivate: guards,
    children: [
      {
        path: 'home',
        component: PortalDashboardComponent,
      },
      {
        path: 'search-and-query',
        component: SearchAndQueryComponent,
      },
      {
        path: 'search-and-query/client-search',
        component: ClientSearchComponent,
      },
      {
        path: 'search-and-query/claim-search',
        component: ClaimSearchComponent,
      },
      {
        path: 'search-and-query/claim-search/advanced-search',
        component: AdvancedClaimSearchComponent,
      },
      {
        path: 'executive-dashboards',
        component: FakePageComponent,
      },
      {
        path: 'executive-dashboards/population-served',
        component: FakePageComponent,
      },

      {
        path: 'claims',
        component: FakePageComponent,
      },
      {
        path: 'claims/adjudicated-claims',
        component: AdjudicatedClaimsComponent,
      },
      {
        path: 'claims/:id',
        loadChildren: () =>
          import('@dbh/claims/claim-detail-feature').then(
            (m) => m.ClaimsClaimDetailFeatureModule
          ),
      },
      {
        path: 'clients/:id',
        loadChildren: () =>
          import('@dbh/clients/client-feature').then(
            (m) => m.ClientsClientComponentFeatureModule
          ),
      },
      {
        path: 'clients/:id/demographics',
        loadChildren: () =>
          import('@dbh/clients/demographics-feature').then(
            (m) => m.ClientsDemographicsComponentFeatureModule
          ),
      },
      {
        path: 'clients/:id/claim-history',
        loadChildren: () =>
          import('@dbh/clients/claim-history-feature').then(
            (m) => m.ClientsClaimHistoryComponentFeatureModule
          ),
      },
      {
        path: 'external-resources',
        component: ExternalResourcesComponent,
      },
      {
        path: 'data-governance',
        component: DataGovernanceComponent,
      },
      {
        path: 'data-governance/business-glossary',
        component: BusinessGlossaryComponent,
      },
      {
        path: 'data-governance/data-tracking-system-inventory',
        component: DataTrackingSystemInventoryComponent,
      },
      {
        path: 'data-governance/ite-database-naming-conventions',
        component: IteDatabaseNamingConventionsComponent,
      },
      {
        path: 'data-governance/data-dictionary',
        component: DataDictionaryComponent,
      },
      {
        path: 'provider-gateway/submissions',
        loadChildren: () =>
          import('@dbh/bhsd/submission-history-feature').then(
            (m) => m.BhsdSubmissionHistoryFeatureModule
          ),
      },
      {
        path: 'provider-gateway/submissions/:id/demographics',
        loadChildren: () =>
          import('@dbh/bhsd/submission-demographics-feature').then(
            (m) => m.BhsdSubmissionDemographicsFeatureModule
          ),
      },
      {
        path: 'provider-gateway/submissions/:id/census',
        loadChildren: () =>
          import('@dbh/bhsd/submission-census-feature').then(
            (m) => m.BhsdSubmissionCensusFeatureModule
          ),
      },
      {
        path: 'provider-gateway/submissions/:id/records/:recordId',
        loadChildren: () =>
          import('@dbh/bhsd/record-detail-feature').then(
            (m) => m.BhsdRecordDetailFeatureModule
          ),
      },
      {
        path: 'provider-gateway/submissions/:id',
        loadChildren: () =>
          import('@dbh/bhsd/submission-detail-feature').then(
            (m) => m.BhsdSubmissionDetailFeatureModule
          ),
      },
      {
        path: 'provider-gateway/submit-new-bhsd',
        loadChildren: () =>
          import('@dbh/bhsd/submit-new-file-feature').then(
            (m) => m.BhsdSubmitNewFileFeatureModule
          ),
        canLoad: [ProviderGuard],
      },
      {
        path: 'provider-gateway/provider-profile/:id',
        loadChildren: () =>
          import('@dbh/providers/profile-feature').then(
            (m) => m.ProvidersProfileModule
          ),
      },
      {
        path: 'user-profile',
        component: AdUserProfileComponent,
      },
      {
        path: 'provider-gateway/submission-status',
        loadChildren: () =>
          import('@dbh/bhsd/submission-status-feature').then(
            (m) => m.BhsdSubmissionStatusFeatureModule
          ),
      },
      {
        path: 'provider-gateway/companion-guide',
        loadChildren: () =>
          import('@dbh/bhsd/companion-guide-page').then(
            (m) => m.BhsdCompanionGuidePageFeatureModule
          ),
      },
      {
        path: 'provider-gateway',
        loadChildren: () =>
          import('@dbh/bhsd/landing-page-feature').then(
            (m) => m.BhsdLandingPageFeatureModule
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    PortalDashboardComponent,
    FakePageComponent,
    ExternalResourcesComponent,
    AdjudicatedClaimsComponent,
    SearchAndQueryComponent,
    ClientSearchComponent,
    ClaimSearchComponent,
    AdvancedClaimSearchComponent,
    DataGovernanceComponent,
    BusinessGlossaryComponent,
    DataTrackingSystemInventoryComponent,
    IteDatabaseNamingConventionsComponent,
    DataDictionaryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataAccessModule,
    ClaimsDataAccessModule,
    BhsdUiModule,
    SharedUiModule,
    TableauModule,
    MsalModule,
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? 'enabledNonBlocking'
          : 'disabled', // Set to enabledBlocking to use Angular Universal
    }),
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
      useValue: 'ITE Portal',
    },
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
