import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {  MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('UsersService', () => {
  let service: UsersService;
  let USERS: any;
  USERS = {
    $key: '',
    name: 'john Doe',
    email: 'testing@gmail.com',
    age: 54,
    password: "123456",
    money: 15000,
    rentedVehicles: [
      "Okay",
    ],
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
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getPassUserValue', () => {
    spyOn(service, 'getPassUserValue').and.callThrough();
    service.getPassUserValue(USERS);
    expect(service.getPassUserValue).toHaveBeenCalled();
  });
  it('should call addUsers', () => {
    spyOn(service, 'addUsers').and.callThrough();
    service.addUsers(USERS);
    expect(service.addUsers).toHaveBeenCalled();
  });
  it('should call getUsers', () => {
    spyOn(service, 'getUsers').and.callThrough();
    service.getUsers();
    expect(service.getUsers).toHaveBeenCalled();
  });
  it('should call modifyUsers', () => {
    spyOn(service, 'modifyUsers').and.callThrough();
    service.modifyUsers("0yIvB88YKwZ16iYaD9dd",USERS);
    expect(service.modifyUsers).toHaveBeenCalled();
  });
  it('should call removeUsers', () => {
    spyOn(service, 'removeUsers').and.callThrough();
    service.removeUsers("userKey");
    expect(service.removeUsers).toHaveBeenCalled();
  });
  it('should call getOneUsers', () => {
    spyOn(service, 'getOneUsers').and.callThrough();
    service.getOneUsers("paul@gmail.com");
    expect(service.getOneUsers).toHaveBeenCalled();
  });
});
