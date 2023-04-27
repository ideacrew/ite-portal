import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TableauModule } from 'ngx-tableau';

import { DataAccessModule } from '@dbh/bhsd/data-access';
import { ClaimsDataAccessModule } from '@dbh/claims/data-access';
import {
  AuthGuard,
  AuthInterceptor,
  AuthModule,
  LogInComponent,
  UserProfileComponent,
  ResetPasswordComponent,
} from '@dbh/auth';
import { APP_TITLE } from '@dbh/theme';
import { BhsdUiModule } from '@dbh/bhsd/ui';
import { ProviderGuard } from '@dbh/providers/util';
import { SharedUiModule } from '@dbh/shared/ui';

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
    AuthModule,
    BhsdUiModule,
    SharedUiModule,
    TableauModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LogInComponent,
      },
      {
        path: '',
        component: PortalComponent,
        canActivate: [AuthGuard],
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
            component: UserProfileComponent,
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
            path: 'reset-password',
            component: ResetPasswordComponent,
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
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_TITLE,
      useValue: 'ITE Portal',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
