import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserLoginsComponent } from './user-logins';

describe('UserLoginsComponent', () => {
  let component: UserLoginsComponent;
  let fixture: ComponentFixture<UserLoginsComponent>;

  const activatedRouteMock = {
    paramMap: of({ get: () => '1' }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoginsComponent, HttpClientTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserLoginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
