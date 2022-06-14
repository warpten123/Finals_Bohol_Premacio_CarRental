import { RequestRental } from 'src/app/services/request-rental/request-rental-interface';
import { CarsInterface } from 'src/app/services/cars/cars-interface';
import { UsersInterface } from 'src/app/services/users/user-interface';
import { of } from 'rxjs';

import { CarsService } from 'src/app/services/cars/cars.service';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { AdminRentedComponent } from './admin-rented.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {  MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersService } from 'src/app/services/users/users.service';
import { RequestRentalService } from 'src/app/services/request-rental/request-rental.service';
import { By } from '@angular/platform-browser';


describe('AdminRentedComponent', () => {
  let component: AdminRentedComponent;
  let fixture: ComponentFixture<AdminRentedComponent>;
  let mockUserService: any;
  let mockCarService: any;
  let mockRentalService: any;
  let USERS: UsersInterface;
  let CARS: CarsInterface;
  let RENTALS: RequestRental;
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
  CARS = {
    $carKey: '',
    carName: 'Toyota',
    carColor: 'Red', 
    carRentPrice: 20000,
    carMileage: 100,
    carStatus: 'Available',
    carImage: "check.jpeg",
    carLocation: {
      city: "a",
      barangay: "as",
    } 
  }

  RENTALS = {
    $key: '',
    userKey: '1',
    carKey: '1',
    requestDate: 'TODAY',
    requestStatus: 'Pending',
  }
 
  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj<UsersService>('UsersService',['getUsers', 'addUsers','modifyUsers'])
    mockCarService = jasmine.createSpyObj<CarsService>('CarsService',['getCars', 'addCars','modifyCars'])
    mockRentalService = jasmine.createSpyObj<RequestRentalService>('RequestRentalService',['getRentalRequests', 'addRequest'])
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [
        { provide: MatDialog, useValue: {}},
        { provide: MatDialogRef, useValue: {}},
        { provide: UsersService, useValue: mockUserService},
        { provide: CarsService, useValue: mockCarService},
        // { provide: RequestRentalService, useValue: mockRentalService}
      ],
      declarations: [ AdminRentedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockUserService.getUsers.and.returnValue(of(USERS));
    mockCarService.getCars.and.returnValue(of(CARS));
    mockRentalService.getRentalRequests.and.returnValue(of(RENTALS));

    fixture = TestBed.createComponent(AdminRentedComponent);
    // mockCarService = TestBed.get(CarsService);
    // mockUserService = TestBed.get(UsersService);
    // mockRentalService = TestBed.get(RequestRentalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit is called',() => {
    spyOn(component,'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  })
  it('should get list of users from the user service', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(mockUserService.getUsers).toHaveBeenCalled();
  });
  it('should get list of cars from the car service', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(mockCarService.getCars).toHaveBeenCalled();
  });
  it('should get list of cars from the car service', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(mockCarService.getCars).toHaveBeenCalled();
  });
  
  // it('should get list of rentals from the rental service', () => {
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   expect(mockRentalService.getRentalRequests).toHaveBeenCalled();
  // });
  // it('should click button and call rent accept ',fakeAsync(() => {
  //   spyOn(component,'rentAccept').and.callThrough();
  //   component.rentAccept(RENTALS,CARS,USERS);
  //   fixture.detectChanges();
  //   expect(RENTALS).not.toBeUndefined();
 
  //   let click = fixture.debugElement.query(By.css('#rentAccept')).nativeElement;
  //   click.click();
  //   expect(component.rentAccept).toHaveBeenCalled();
  // }))
  // it('should click button and call rent deny',()=>{
  //   spyOn(component,'rentDeny').and.callThrough();
  //   component.rentDeny(RENTALS);
  //   let click = fixture.debugElement.query(By.css('#rentDeny')).nativeElement;
  //   click.click();
    
  //   expect(component.rentDeny).toHaveBeenCalled();
  // })
});
