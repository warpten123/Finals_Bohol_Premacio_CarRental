import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let spy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
