import { TestBed } from '@angular/core/testing';

import { ProfileserviceService } from './profile.service';

describe('ProfileserviceService', () => {
  let service: ProfileserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});