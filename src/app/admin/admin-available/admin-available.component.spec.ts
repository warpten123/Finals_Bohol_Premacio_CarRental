import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AdminAvailableComponent } from './admin-available.component';

import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS, AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CarsService } from 'src/app/services/cars/cars.service';
import { HotToastService } from '@ngneat/hot-toast';
import { CarsInterface } from 'src/app/services/cars/cars-interface';
import {MatCardHarness} from '@angular/material/card/testing';
import { MatCardModule } from '@angular/material/card';
describe('AdminAvailableComponent', () => {
  let component: AdminAvailableComponent;
  let fixture: ComponentFixture<AdminAvailableComponent>;
  let toastService: jasmine.SpyObj<HotToastService>;
  let mockCarService: any;
  let CARS: any;
  CARS = [
    {carKey: '',carName: 'Toyota',carColor: 'Red', carRentPrice: 20000,carMileage: 100,carStatus: 'Available', carLocation: [{carBarangay: 'Cansubing', carCity: 'Cebu'}]},
    {carKey: '',carName: 'Nisan',carColor: 'Blue', carRentPrice: 100000,carMileage: 5444,carStatus: 'Available', carLocation: [{carBarangay: 'Cansubing', carCity: 'Cebu'}]},
    {carKey: '',carName: 'Ford',carColor: 'Black', carRentPrice: 150000,carMileage: 500,carStatus: 'Available', carLocation: [{carBarangay: 'Cansubing', carCity: 'Cebu'}]},
  ];
  beforeEach(async () => {
    mockCarService = jasmine.createSpyObj<CarsService>('CarsService',['addCars', 'getCars'])
   
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        MatCardModule,
      ],
      providers: 
      [
        MatCardHarness,
        // { provide: CarsService, useValue: mockCarService },
        { provide: MatDialog, useValue: {}},
        { provide: MatDialogRef, useValue: {}}
      ],
      declarations: [ AdminAvailableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('it should create', () => {
  
    expect(component).toBeTruthy();
  });

  it('should get list of cars from the car service', () => {
    mockCarService.getCars.and.returnValue(of(CARS));
    fixture.detectChanges();
    expect(fixture.componentInstance.cars.length).toBe(0);
  });
  // it('should show list of cars if car.length > 0',() =>{
  //   component.cars.length = 1;
  //   fixture.detectChanges();
  //   let resultBlock = fixture.debugElement.query(By.css('#displayCars'));
  //   expect(resultBlock).not.toBeNull();
  // })
  it('should display text: There are no cars registered! if car list is empty',() =>{
    let label = fixture.debugElement.query(By.css('#noCars')).nativeElement;
    fixture.detectChanges()
    expect(label.textContent).toBe('There are no cars registered!'); 
  })
  // it('should contain the title and content of the car',() =>{
  //   let cardTitle: any, cardContent: any;
  //   let cardTest = Array.from(document.getElementsByTagName('mat-card'));
  //   cardTest.forEach(card =>{
  //      cardTitle = card.getElementsByTagName('mat-card-title')[0].textContent;
  //      cardContent = card.getElementsByTagName('mat-card-content')[0].textContent;
  //   })
  //   expect(testData).toContain(jasmine.objectContaining({
  //     title: cardTitle,
  //     content: cardContent,
  //   }));
  // })
  // it('should show delete button if car is available',()=>{
  //   spyOn(component,'onDelete').and.callThrough();
  //   component.cars[0].carStatus = "Available";
  //   fixture.detectChanges();
  //   expect(component.onDelete).toHaveBeenCalled();
    
  // })
});
