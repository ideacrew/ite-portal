import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProviderLoginsComponent } from './provider-logins.component';

describe('ProviderLoginsComponent', () => {
  let component: ProviderLoginsComponent;
  let fixture: ComponentFixture<ProviderLoginsComponent>;

  const activatedRouteMock = {
    paramMap: of({ get: () => '1' }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderLoginsComponent, HttpClientTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderLoginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
