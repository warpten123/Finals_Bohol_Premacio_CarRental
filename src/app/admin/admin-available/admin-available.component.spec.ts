import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
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
import { OverlayModule } from '@angular/cdk/overlay';
import {MatDialogModule} from '@angular/material/dialog';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonHarness} from '@angular/material/button/testing';
describe('AdminAvailableComponent', () => {
  let component: AdminAvailableComponent;
  let fixture: ComponentFixture<AdminAvailableComponent>;
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
  beforeEach(async () => {
    mockCarService = jasmine.createSpyObj<CarsService>('CarsService',['addCars', 'getCars'])
   
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        MatCardModule,
        OverlayModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
      providers: 
      [
        MatCardHarness,
        MatButtonHarness,
        // { provide: CarsService, useValue: mockCarService },
        { provide: MatDialogRef, useValue: {}},
        {provide: MatDialog, useValue: jasmine.createSpyObj<MatDialog>(['open'])}
      ],
      declarations: [ AdminAvailableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAvailableComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
   
  });

  it('it should create', () => {
  
    expect(component).toBeTruthy();
  });

  it('should get list of cars from the car service', () => {
    mockCarService.getCars.and.returnValue(of(CARS));
    fixture.detectChanges();
    expect(component.cars.length).toBe(0);
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
  it('should call onDelete method',()=>{
    spyOn(component,'onDelete').and.callThrough();
    component.onDelete(CARS);
    expect(component.onDelete).toHaveBeenCalled();
  })
  it('should call onEdit method and open mat dialog',()=>{
    spyOn(component,'onEdit').and.callThrough();
    component.onEdit(CARS);
    expect(dialog.open.calls.count()).toBe(1);
    expect(component.onEdit).toHaveBeenCalled();
  })
  it('button for delete car is enabled if car status is available',async ()=>{
    component.cars[0] = CARS[0];
    component.cars[0].carStatus = "Available";
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('button').disabled).toBeFalse();
    });
  it('button for edit car is enabled if car status is available',async ()=>{
    component.cars[0] = CARS[0];
    component.cars[0].carStatus = "Available";
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('button').disabled).toBeFalse();
    });
  it('button for delete car is disabled if car status is available',async ()=>{
    component.cars[0] = CARS[0];
    component.cars[0].carStatus = "Rented";
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('button').disabled).toBeTrue();
    });
  it('button for edit car is disabled if car status is available',async ()=>{
    component.cars[0] = CARS[0];
    component.cars[0].carStatus = "Rented";
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('button').disabled).toBeTrue();
    });
  it('delete button is clicked', fakeAsync(() => {
    spyOn(component, 'onDelete').and.callThrough();
    component.cars[0] = CARS[0];
    component.cars[0].carStatus = "Available";
    // component.onDelete(CARS);
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('button');
     button.click();
    tick();
    expect(component.onDelete).toHaveBeenCalled();
    }));
  it('edit button is clicked', fakeAsync(() => {
    spyOn(component, 'onEdit').and.callThrough();
    component.cars[0] = CARS[0];
    component.cars[0].carStatus = "Available";
    component.onEdit(CARS);
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.onEdit).toHaveBeenCalled();
    }));
    

});
