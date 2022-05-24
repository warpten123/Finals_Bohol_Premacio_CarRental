import { TestBed } from '@angular/core/testing';

import { RequestRentalService } from './request-rental.service';

describe('RequestRentalService', () => {
  let service: RequestRentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestRentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
