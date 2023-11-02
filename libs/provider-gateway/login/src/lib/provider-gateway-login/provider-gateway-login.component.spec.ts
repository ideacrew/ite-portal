import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderGatewayLoginComponent } from './provider-gateway-login.component';

describe('ProviderGatewayLoginComponent', () => {
  let component: ProviderGatewayLoginComponent;
  let fixture: ComponentFixture<ProviderGatewayLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderGatewayLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderGatewayLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
