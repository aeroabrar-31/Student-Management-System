import { TestBed } from '@angular/core/testing';

import { OtpnewpasswordService } from './otpnewpassword.service';

describe('OtpnewpasswordService', () => {
  let service: OtpnewpasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpnewpasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
