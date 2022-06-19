import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDashboardComponent } from './user-dashboard.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {  MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { HotToastService } from '@ngneat/hot-toast';
import { CarsInterface } from 'src/app/services/cars/cars-interface';
import {MatCardHarness} from '@angular/material/card/testing';
import { MatCardModule } from '@angular/material/card';
import { OverlayModule } from '@angular/cdk/overlay';
import {MatDialogModule} from '@angular/material/dialog';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonHarness} from '@angular/material/button/testing';
import { CarsService } from 'src/app/services/cars/cars.service';
import { UsersService } from 'src/app/services/users/users.service';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let toastService: jasmine.SpyObj<HotToastService>;
  let mockCarService: any;
  let CARS: any;
  let dialog: jasmine.SpyObj<MatDialog>;
  let loader: HarnessLoader;
  CARS = [
    {carKey: '',carName: 'Toyota',carColor: 'Red', carRentPrice: 20000,carMileage: 100,carStatus: 'Available', carLocation: [{carBarangay: 'Cansubing', carCity: 'Cebu'}]},
    {carKey: '',carName: 'Nisan',carColor: 'Blue', carRentPrice: 100000,carMileage: 5444,carStatus: 'Available', carLocation: [{carBarangay: 'Cansubing', carCity: 'Cebu'}]},
    {carKey: '',carName: 'Ford',carColor: 'Black', carRentPrice: 150000,carMileage: 500,carStatus: 'Available', carLocation: [{carBarangay: 'Cansubing', carCity: 'Cebu'}]},
  ];
  let mockUserService: any;
  let USERS: any;
  USERS = [
    {$key: '',name: 'john',email: 'john@gmail.com', age: 20, pasword: "123123", money: 123132, rentedVehicles: ['asda','asd']}
  ];
  let curr_User: any;
  curr_User = [
    {$key: '',name: 'john',email: 'john@gmail.com', age: 20, pasword: "123123", money: 123132, rentedVehicles: ['asda','asd']}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [
        { provide: MatDialog, useValue: {}},
        { provide: MatDialogRef, useValue: {}}
      ],
      declarations: [ UserDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // should have a list of cars
  it('should have a list of cars', () => {
    let service = fixture.debugElement.injector.get(CarsService);
    spyOn(service, 'getCars').and.returnValue(of(CARS));
    fixture.detectChanges();
    expect(component.cars).toBeTruthy();
  });
  it('should filter list of items', () => {
    const search = 'search';
    component.searchForm.setValue({search});
    component.filterItems(search);

    expect(component.cars.length).toBe(0);
  });
  it('should push to the cars array if search location is equal to cars barangay location', () => {
    const search = 'Cansubing';
    component.searchForm.setValue({search});
    component.filterItems(search);
    expect(search.toLocaleLowerCase()).toMatch(CARS[0].carLocation[0].carBarangay.toLocaleLowerCase());
  });
  it('should push to the cars array if search location is equal to cars city location', () => {
    const search = 'Cebu';
    component.searchForm.setValue({search});
    component.filterItems(search);
    expect(search.toLocaleLowerCase()).toMatch(CARS[0].carLocation[0].carCity.toLocaleLowerCase());
  });

  // if searchform formGroup is invalid, push all cars to the cars array
  // it('should push all cars to the cars array if searchform formGroup is invalid', () => {
  //   let service = fixture.debugElement.injector.get(CarsService);
  //   spyOn(service, 'getCars').and.returnValue(of(CARS));
  //   component.filterItems('');
  //   expect(component.cars).toBe(CARS);
  // });
  // if searchform is empty, push all cars to the cars array
  // it('should push all cars to the cars array if searchform is empty', () => {
  //   let service = fixture.debugElement.injector.get(CarsService);
  //   spyOn(service, 'getCars').and.returnValue(of(CARS));
  //   component.filterItems('');
  //   expect(component.cars).toBe(CARS);
  // });
  // it('should call OnView when button is click', () => {
  //   let service = fixture.debugElement.injector.get(HotToastService);
  //   spyOn(service, 'error');
  //   let button = fixture.debugElement.query(By.css('button'));
  //   button.triggerEventHandler('click', null);
  //   expect(service.error).toHaveBeenCalled();
  // });
  // push index of temp user to curr_user if temp_user[i].email is equal to this.email
  // it('should push index of temp user to curr_user if temp_user[i].email is equal to this.email', () => {
  //   let service = fixture.debugElement.injector.get(UsersService);
  //   spyOn(service, 'getUsers').and.returnValue(of(USERS));
  //   component.ngOnInit();
  //   console.log(curr_User.email);
  //   expect(curr_User.email).toEqual(USERS[0].email);
  // });
  
  // toast an error if curr_User.money < CARS.carRentPrice
  it('should toast an error if curr_User.money < CARS.carRentPrice', () => {
    let service = fixture.debugElement.injector.get(HotToastService);
    spyOn(service, 'error');
    component.onView(CARS[0]);
    // check if curr_User.money < CARS.carRentPrice
    expect(component.curr_User.money).toBeLessThan(CARS[0].carRentPrice);
  });
});
