import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpnewpasswordComponent } from './otpnewpassword.component';

describe('OtpnewpasswordComponent', () => {
  let component: OtpnewpasswordComponent;
  let fixture: ComponentFixture<OtpnewpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpnewpasswordComponent]
    });
    fixture = TestBed.createComponent(OtpnewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
