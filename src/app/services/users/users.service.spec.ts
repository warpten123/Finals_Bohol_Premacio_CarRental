import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {  MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('UsersService', () => {
  let service: UsersService;
  let spy: jasmine.Spy;

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

  // should return a passUserValues$ observable 

  // should get one users from firebase
  // it('should get one users from firebase', () => {
  //   const userResponse = [
  //     {
  //       email: 'bohol@gmail.com',
  //       password: '123456',
  //       $key: '',
  //       name: '',
  //       age: 0,
  //       money: 0,
  //       rentedVehicles: []
  //     }
  //   ];
  //   UsersService.getUsers().subscribe((val) => {
  //     expect(val).toEqual(userResponse);
  //   });
  // });
});
