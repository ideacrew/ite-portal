import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProviderLoginsComponent } from './provider-logins.component';

describe('ProviderLoginsComponent', () => {
  let component: ProviderLoginsComponent;
  let fixture: ComponentFixture<ProviderLoginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderLoginsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderLoginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
