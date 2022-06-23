import { TestBed } from '@angular/core/testing';
import { RequestRentalService } from './request-rental.service';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {  MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('RequestRentalService', () => {
  let service: RequestRentalService;
  let RENTALS: any;
  RENTALS = {
    $key: '0nQqNx0e9gU1sd21t6m6',
    userKey: '2iDSqI2G348kzyqGg4Ps',
    carKey: '9L4Qj0WjdXy547jqPN4Y',
    requestDate: 'TODAY',
    requestStatus: 'Pending',
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [
        { provide: MatDialog, useValue: {}},
        { provide: MatDialogRef, useValue: {}}
      ],

    });
    service = TestBed.inject(RequestRentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getPassRentValue', () => {
    spyOn(service, 'getPassRentValue').and.callThrough();
    service.getPassRentValue(RENTALS);
    expect(service.getPassRentValue).toHaveBeenCalled();
  });
  it('should call getRentalRequests', () => {
    spyOn(service, 'getRentalRequests').and.callThrough();
    service.getRentalRequests();
    expect(service.getRentalRequests).toHaveBeenCalled();
  });
  it('should call addRequest', () => {
    spyOn(service, 'addRequest').and.callThrough();
    service.addRequest(RENTALS);
    expect(service.addRequest).toHaveBeenCalled();
  });
  it('should call editRequest', () => {
    spyOn(service, 'editRequest').and.callThrough();
    service.editRequest("0nQqNx0e9gU1sd21t6m6",(RENTALS));
    expect(service.editRequest).toHaveBeenCalled();
  });
  it('should call deleteRequest', () => {
    spyOn(service, 'deleteRequest').and.callThrough();
    service.deleteRequest("0nQqNx0e9gU1sd21t6m6");
    expect(service.deleteRequest).toHaveBeenCalled();
  });
  
  
});
