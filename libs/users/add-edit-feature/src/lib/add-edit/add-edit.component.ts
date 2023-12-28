/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, shareReplay, switchMap } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { UsersService } from '@dbh/users/data-access';

type UserForm = {
  email: FormControl<string>;
  is_active: FormControl<boolean>;
  is_dbh: FormControl<boolean>;
  provider_id: FormControl<string | null>;
};

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

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
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
        .pipe(first())
        .subscribe((x) => this.userForm.patchValue(x));
    }
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
    this.userService.createUser(this.userForm.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.id || '', this.userForm)
      .pipe(first())
      .subscribe();
  }
}
