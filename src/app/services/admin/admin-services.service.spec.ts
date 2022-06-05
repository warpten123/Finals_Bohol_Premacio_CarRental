import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminServicesService } from '../admin/admin-services.service';

describe('AdminServicesService', () => {
  let service: AdminServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
    });
    service = TestBed.inject(AdminServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
