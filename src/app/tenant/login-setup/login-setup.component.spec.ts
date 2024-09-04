import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSetupComponent } from './login-setup.component';

describe('LoginSetupComponent', () => {
  let component: LoginSetupComponent;
  let fixture: ComponentFixture<LoginSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
