import { TestBed } from '@angular/core/testing';

import { SpecialistService } from './specialist.service';

describe('SpecialistService', () => {
  let service: SpecialistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
