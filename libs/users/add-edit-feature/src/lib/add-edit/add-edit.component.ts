/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { UsersService } from '@dbh/users/data-access';
import { BHSDService } from '@dbh/bhsd/data-access';

@Component({
  selector: 'users-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  user_id: string | null = null; // Explicitly define the type of 'id' property // NX CACHE CLEAR COMMENT
  createNew = true; // Add 'createNew' property with boolean type
  pageTile = 'Update User'; // Add 'pageTile' property with string type
  userForm!: FormGroup;
  submitted = false;
  showError = false;
  errorMessage = '';
  providers: { id: string; provider_name: string }[] = [];
  currentUser: { user_id?: string; email?: string } = {};
  providerRequired = true;
  loginUrl = '';

  // These values are updated in the constructor based on the environment
  b2cSubdomain: string = process.env['NX_B2C_SUBDOMAIN'] as unknown as string;
  b2cClientId: string = process.env['NX_GATEWAY_C_ID'] as unknown as string;
  b2cRedirectUri: string = process.env['NX_REDIRECT_URI'] as unknown as string;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private bhsdService: BHSDService,
    private fb: FormBuilder
  ) {
    if (process.env['NX_PROD'] === 'true') {
      this.b2cSubdomain = process.env[
        'NX_B2C_SUBDOMAIN_PROD'
      ] as unknown as string;
      this.b2cClientId = process.env[
        'NX_GATEWAY_C_ID_PROD'
      ] as unknown as string;
      this.b2cRedirectUri = process.env[
        'NX_REDIRECT_URI_PROD'
      ] as unknown as string;
    }
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.user_id = this.route.snapshot.params['id'] as string; // Explicitly cast the value to string
    }
    this.createNew = !this.user_id;
    this.pageTile = this.createNew ? 'Create User' : 'Update User';

    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      is_active: [true],
      is_dbh: [false],
      provider_id: ['', [Validators.required]],
    });

    // Set up the dynamic validation based on the value of 'is_dbh'
    this.checkProviderValidation();

    if (!this.createNew) {
      this.userService
        .getUser(this.user_id ?? 'fake-value')
        .pipe(take(1))
        .subscribe((x) => this.userForm.patchValue(x));
    }

    this.getProviders();
  }

  get email() {
    return this.userForm.get('email');
  }

  private checkProviderValidation() {
    this.userForm.get('is_dbh')?.valueChanges.subscribe((isDbh: boolean) => {
      const providerIdControl = this.userForm.get('provider_id');

      if (!isDbh) {
        // If 'is_dbh' is false, set 'provider_id' as required
        providerIdControl?.setValidators([Validators.required]);
        this.providerRequired = true;
      } else {
        // If 'is_dbh' is true, remove the required validator
        providerIdControl?.clearValidators();
        this.providerRequired = false;
      }

      // Update the validation status
      providerIdControl?.updateValueAndValidity();
    });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.createNew ? this.createUser() : this.updateUser();
  }

  createUser() {
    this.userService
      .createUser(this.userForm.value)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          if (isDevMode()) {
            console.log(res);
            console.log('User created successfully');
          }

          this.submitted = true;
          this.currentUser = res;
          this.loginUrl = this.buildLoginUrl();
        },
        error: (err: { error: string }) => {
          if (isDevMode()) {
            console.log(err);
            console.error(`API Error: ${err.error}`);
          }

          this.showError = true;
          this.errorMessage = err.error;
        },
      });
  }

  updateUser() {
    this.userService
      .updateUser(this.user_id || '', this.userForm)
      .pipe(take(1))
      .subscribe();
  }

  getProviders(): void {
    this.bhsdService
      .getProviders()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          const providers = res as {
            providers: {
              id: string;
              provider_name: string;
            }[];
          };

          const providerNames = providers.providers.map(
            ({ id, provider_name }) => ({
              id,
              provider_name,
            })
          );

          this.providers = [...providerNames];
          if (isDevMode()) console.log(this.providers);
        },
        error: (err: { error: string }) => {
          console.log(err);
          console.error(`API Error: ${err.error}`);
        },
      });
  }

  buildLoginUrl(): string {
    const link = `https://${this.b2cSubdomain}.b2clogin.com/${
      this.b2cSubdomain
    }.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_sign_up_1&client_id=${
      this.b2cClientId
    }&nonce=defaultNonce&redirect_uri=${encodeURIComponent(
      this.b2cRedirectUri
    )}&scope=openid&response_type=id_token&prompt=login`;
    return link;
  }

  copyToClipboard() {
    navigator.clipboard
      .writeText(this.loginUrl)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  }
}
