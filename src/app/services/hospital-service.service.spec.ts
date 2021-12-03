import { TestBed } from '@angular/core/testing';

import { HospitalServiceService } from './hospital-service.service';

describe('HospitalServiceService', () => {
  let service: HospitalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
