import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RequestRentalService } from './request-rental.service';

describe('RequestRentalService', () => {
  let service: RequestRentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
    });
    service = TestBed.inject(RequestRentalService);
  });
});
