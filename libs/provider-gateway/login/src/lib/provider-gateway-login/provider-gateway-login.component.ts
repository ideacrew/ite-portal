import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RedirectRequest } from '@azure/msal-browser';
import { IdTokenClaims, PromptValue } from '@azure/msal-common'
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalBroadcastService,
  MsalService,
} from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dbh-provider-gateway-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <svg
        class="application-title"
        width="275"
        height="77"
        viewBox="0 0 139 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>ITE Portal</title>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M52.5411 1.85406L51.5657 1.63376L51.3146 2.7454C51.6536 2.72413 51.9895 2.74954 52.3206 2.82431C54.6279 3.3454 56.2073 6.15343 56.8176 10.1429H56.8169C57.2885 13.2758 57.1647 17.1307 56.3296 21.1763C55.6348 24.5424 54.5435 27.5757 53.2373 30.0263H57.3888L58.4619 23.5797H61.9739C63.5022 23.5797 64.85 23.2982 66.0173 22.7351C67.1845 22.172 68.1324 21.3888 68.8611 20.3856C69.5963 19.3758 70.0735 18.2076 70.2928 16.8807C70.5056 15.5603 70.4153 14.3953 70.0219 13.3856C69.635 12.3694 68.9579 11.5765 67.9906 11.0069C67.0297 10.4309 65.8012 10.1429 64.3051 10.1429H57.8281C57.7556 9.64702 57.6687 9.16709 57.5678 8.70493C57.1866 6.95843 56.5952 5.42037 55.7811 4.23388C54.9637 3.04264 53.8848 2.15752 52.5411 1.85406ZM41.1299 30.0775H41.13C40.9327 29.1508 40.7931 28.1452 40.7151 27.0775C40.7038 26.9234 40.6938 26.7681 40.6851 26.6115H36.2724H33.2328L33.7218 23.6115L34.0067 21.8639H40.7955C40.8102 21.7092 40.8261 21.5538 40.843 21.3979C40.9497 20.4173 41.0994 19.4144 41.2941 18.3979H38.2436H37.6268H34.5871L35.0771 15.3979L35.3609 13.6601H42.5228C42.5748 13.5035 42.6277 13.3482 42.6813 13.194C43.051 12.1327 43.4596 11.1289 43.8991 10.194H40.618H31.7528L28.9602 27.0775L28.464 30.0775H31.5048H38.0722H40.1264C40.1414 30.1504 40.1569 30.223 40.1726 30.2951C40.5539 32.0416 41.1452 33.5796 41.9593 34.7661C42.7767 35.9574 43.8556 36.8425 45.1993 37.146L46.1747 37.3662L46.4072 36.3371C46.0744 36.3563 45.7446 36.3305 45.4195 36.2571C43.3385 35.7871 41.8497 33.4569 41.1299 30.0775ZM59.0226 20.2108H61.8481C62.6607 20.2108 63.3539 20.0716 63.9279 19.7933C64.5082 19.5085 64.9693 19.1169 65.3111 18.6186C65.6529 18.1137 65.8754 17.5344 65.9786 16.8807C66.0882 16.214 66.0527 15.6348 65.8721 15.1429C65.6916 14.6509 65.3595 14.2691 64.8758 13.9972C64.3986 13.7189 63.757 13.5798 62.9509 13.5798H60.1263L59.0226 20.2108ZM74.3069 29.3467C75.3 29.9939 76.5543 30.3176 78.0697 30.3176C79.5594 30.3176 80.8975 30.0004 82.0841 29.3661C83.2707 28.7253 84.2541 27.8321 85.0344 26.6865C85.8147 25.5409 86.3306 24.2075 86.5821 22.6865C86.8336 21.1396 86.7562 19.7836 86.3499 18.6186C85.9437 17.4535 85.244 16.5474 84.2509 15.9001C83.2578 15.2464 82.0067 14.9196 80.4977 14.9196C79.0016 14.9196 77.657 15.2399 76.464 15.8807C75.271 16.515 74.2876 17.405 73.5137 18.5506C72.7399 19.6962 72.2304 21.0328 71.9854 22.5603C71.7339 24.1072 71.808 25.4632 72.2078 26.6282C72.6141 27.7868 73.3138 28.693 74.3069 29.3467ZM80.3236 26.5214C79.7883 26.9163 79.1725 27.1137 78.476 27.1137C77.7989 27.1137 77.2636 26.9227 76.8703 26.5409C76.4769 26.1525 76.2222 25.625 76.1061 24.9583C75.99 24.2852 75.9997 23.5215 76.1351 22.6671C76.277 21.7868 76.5253 21.0004 76.88 20.3079C77.2346 19.6153 77.6828 19.0716 78.2245 18.6768C78.7662 18.2755 79.3853 18.0749 80.0817 18.0749C80.7589 18.0749 81.2909 18.2691 81.6778 18.6574C82.0712 19.0457 82.3291 19.5765 82.4517 20.2496C82.5742 20.9163 82.5645 21.68 82.4226 22.5409C82.2808 23.4147 82.0293 24.1978 81.6681 24.8904C81.3135 25.5765 80.8653 26.1202 80.3236 26.5214ZM88.8599 30.0263L91.3362 15.1137H95.3312L94.8959 17.7157H95.0507C95.4763 16.7901 96.047 16.0911 96.7628 15.6186C97.4851 15.1396 98.2622 14.9001 99.0941 14.9001C99.3004 14.9001 99.5164 14.9131 99.7422 14.939C99.9743 14.9584 100.181 14.9908 100.361 15.0361L99.7422 18.7157C99.5616 18.6509 99.3036 18.5992 98.9683 18.5603C98.6394 18.515 98.3267 18.4924 98.03 18.4924C97.4303 18.4924 96.8725 18.625 96.3566 18.8904C95.8407 19.1493 95.4054 19.5118 95.0507 19.9778C94.7025 20.4438 94.4735 20.981 94.3639 21.5894L92.9807 30.0263H88.8599ZM111.434 18.2205L111.947 15.1137H109.14L109.732 11.5409H105.611L105.023 15.1137H102.999L102.477 18.2205H104.511L103.232 25.9875C103.057 26.9583 103.122 27.7642 103.425 28.4049C103.728 29.0457 104.228 29.5214 104.924 29.8321C105.621 30.1363 106.472 30.269 107.478 30.2302C108.007 30.2108 108.465 30.159 108.852 30.0748C109.245 29.9907 109.558 29.913 109.79 29.8418L109.635 26.7642C109.532 26.7836 109.38 26.8127 109.18 26.8515C108.981 26.8839 108.784 26.9001 108.59 26.9001C108.313 26.9001 108.075 26.858 107.875 26.7739C107.681 26.6897 107.543 26.5441 107.459 26.337C107.375 26.1234 107.365 25.8257 107.43 25.4438L108.626 18.2205H111.434ZM117.17 30.3078C116.229 30.3078 115.413 30.1428 114.723 29.8127C114.039 29.4761 113.536 28.9778 113.214 28.3176C112.892 27.6574 112.811 26.8386 112.972 25.8613C113.114 25.0328 113.382 24.3402 113.775 23.7836C114.175 23.2205 114.662 22.7674 115.236 22.4244C115.81 22.0813 116.445 21.8192 117.141 21.638C117.844 21.4567 118.57 21.3338 119.318 21.269C120.182 21.1784 120.885 21.091 121.426 21.0069C121.975 20.9228 122.384 20.803 122.655 20.6477C122.926 20.4859 123.09 20.2464 123.148 19.9292V19.871C123.245 19.2626 123.132 18.7901 122.81 18.4535C122.494 18.1105 121.987 17.939 121.291 17.939C120.556 17.939 119.93 18.1008 119.414 18.4244C118.905 18.748 118.541 19.159 118.321 19.6574L114.568 19.3467C114.904 18.4406 115.41 17.6574 116.087 16.9972C116.77 16.3306 117.593 15.8192 118.554 15.4632C119.514 15.1008 120.591 14.9196 121.784 14.9196C122.61 14.9196 123.38 15.0166 124.096 15.2108C124.818 15.405 125.441 15.706 125.963 16.1137C126.492 16.5215 126.872 17.0458 127.105 17.6865C127.343 18.3208 127.392 19.0813 127.25 19.9681L125.576 30.0263H121.668L122.017 27.9583H121.9C121.584 28.4244 121.198 28.8354 120.74 29.1913C120.282 29.5409 119.756 29.8159 119.163 30.0166C118.57 30.2108 117.905 30.3078 117.17 30.3078ZM118.824 27.4535C119.424 27.4535 119.975 27.3337 120.478 27.0943C120.988 26.8483 121.407 26.5182 121.736 26.104C122.071 25.6897 122.284 25.2205 122.374 24.6962L122.626 23.1137C122.497 23.1978 122.31 23.2723 122.065 23.337C121.826 23.4017 121.565 23.4632 121.281 23.5215C121.004 23.5732 120.724 23.6218 120.44 23.6671C120.156 23.7059 119.901 23.7448 119.676 23.7836C119.179 23.8548 118.734 23.9681 118.341 24.1234C117.947 24.2787 117.628 24.4891 117.383 24.7545C117.138 25.0134 116.986 25.337 116.928 25.7253C116.838 26.2884 116.97 26.7189 117.325 27.0166C117.686 27.3079 118.186 27.4535 118.824 27.4535ZM133.711 30.0263L137 10.1429H132.879L129.59 30.0263H133.711ZM25.2144 10.194H28.2562L27.7539 13.194L27.6758 13.6601H21.6108L18.9023 30.0775H17.8028H14.7622L15.2572 27.0775L16.9758 16.6601L17.4707 13.6601H14.4474H14.4301H11.4057L11.908 10.6601L11.986 10.194H25.2144ZM5.43655 10.194H8.47731L7.98109 13.194L5.18846 30.0775H4.04076H1L1.49622 27.0775L4.28886 10.194H5.43655Z"
          fill="black"
        />
      </svg>
      <p><b>You are not authorized to view this page.</b></p>
      <p><button (click)="login()">Login</button></p>
    </div>
  `,
  styles: [],
})
export class ProviderGatewayLoginComponent implements OnInit {
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadcastService: MsalBroadcastService,
    private authService: MsalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.instance.enableAccountStorageEvents();

    this.msalBroadcastService.inProgress$
      .pipe(
          filter((status: InteractionStatus) => status === InteractionStatus.None),
          takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
      })

    this.msalBroadcastService.msalSubject$
        .pipe(
            filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS
                || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
                || msg.eventType === EventType.SSO_SILENT_SUCCESS),
            takeUntil(this._destroying$)
        )
        .subscribe((result: EventMessage) => {
          let payload = result.payload as AuthenticationResult;
          this.authService.instance.setActiveAccount(payload.account);
          this.checkAndSetActiveAccount();
          return result;
        });

    this.msalBroadcastService.msalSubject$
        .pipe(
            filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_FAILURE || msg.eventType === EventType.ACQUIRE_TOKEN_FAILURE),
            takeUntil(this._destroying$)
        )
        .subscribe((result: EventMessage) => {
            // Check for forgot password error
            // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
            if (result.error && result.error.message.indexOf('AADB2C90118') > -1) {
              this.login();
            };
        });

  }

  checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
        let accounts = this.authService.instance.getAllAccounts();
        this.authService.instance.setActiveAccount(accounts[0]);
    }

    this.router.navigate(['provider-gateway'])
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
        this.authService.loginRedirect(this.msalGuardConfig.authRequest);
    }
  }
}
