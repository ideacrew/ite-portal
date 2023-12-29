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
  id: string | null = null; // Explicitly define the type of 'id' property
  createNew = true; // Add 'createNew' property with boolean type
  pageTile = 'Update User'; // Add 'pageTile' property with string type
  userForm!: FormGroup;
  submitted = false;
  providers: { id: string; provider_name: string }[] = [];
  currentUser: { id?: string; email?: string } = {};

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private bhsdService: BHSDService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'] as string; // Explicitly cast the value to string
    }
    this.createNew = !this.id;
    this.pageTile = this.createNew ? 'Create User' : 'Update User';

    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      is_active: [true, Validators.required],
      is_dbh: [false, Validators.required],
      provider_id: [''],
    });

    if (!this.createNew) {
      this.userService
        .getUser(this.id ?? 'fake-value')
        .pipe(take(1))
        .subscribe((x) => this.userForm.patchValue(x));
    }

    this.getProviders();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    if (this.createNew) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  createUser() {
    this.userService
      .createUser(this.userForm.value)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          if (isDevMode()) console.log(res);
          console.log('User created successfully');
          this.submitted = true;
          this.currentUser = res;
        },
        error: (err: { error: string }) => {
          console.log(err);
          console.error(`API Error: ${err.error}`);
        },
      });
  }

  updateUser() {
    this.userService
      .updateUser(this.id || '', this.userForm)
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

  showSuccess() {
    const content = document.querySelector<HTMLDivElement>('.user-content');
    console.log(content);
  }
}
