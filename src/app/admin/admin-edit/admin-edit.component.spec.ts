import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditComponent } from './admin-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {  MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotToastService } from '@ngneat/hot-toast';
import { CarsService } from 'src/app/services/cars/cars.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

describe('AdminEditComponent', () => {
  let component: AdminEditComponent;
  let fixture: ComponentFixture<AdminEditComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let toastService: jasmine.SpyObj<HotToastService>;
  let mockCarService: jasmine.SpyObj<CarsService>;
  let carService: CarsService;
  const mockCarForm: FormGroup = new FormGroup({
    $carKey: new FormControl('', Validators.required),
    carName: new FormControl('', Validators.required),
    carColor: new FormControl('', Validators.required),
    carRentPrice: new FormControl('', Validators.required),
    carMileage: new FormControl('', Validators.required),
    carImage: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    barangay: new FormControl('', Validators.required),
    
  });
  beforeEach(async () => {
    toastService = jasmine.createSpyObj<HotToastService>('HotToastService',['error','success']);
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
      providers: [
        { provide: MatDialog, useValue: {}},
        { provide: MatDialogRef, useValue: {}},
        {provide: MatDialog, useValue: jasmine.createSpyObj<MatDialog>(['open','closeAll'])},
        {provide: HotToastService, useValue: toastService},
        
      ],
      declarations: [ AdminEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit',()=>{
    const spy = spyOn(component,'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  })
  it('should call onSubmitUpdate when button is click',()=>{
    spyOn(component,'onSubmitUpdate').and.callThrough();
    let click = fixture.debugElement.query(By.css('#onSubmitUpdate')).nativeElement;
    click.click();
    fixture.detectChanges();
    expect(component.onSubmitUpdate).toHaveBeenCalled();
  })
  it('should call clearImage when button is click',()=>{
    spyOn(component,'clearImage').and.callThrough();
    let click = fixture.debugElement.query(By.css('#clearImage')).nativeElement;
    click.click();
    fixture.detectChanges();
    expect(component.clearImage).toHaveBeenCalled();
    
  })
  it('should call close dialog when button is click',()=>{
    spyOn(component,'closeDialog').and.callThrough();
    let click = fixture.debugElement.query(By.css('#closeEdit')).nativeElement;
    click.click();
    fixture.detectChanges();
    expect(component.closeDialog).toHaveBeenCalled();
  })
  it('form should be valid',()=>{
    const mockCar = {
      $carKey: '1',
      carName: 'Toyota',
      carColor: 'Red',
      carRentPrice: 146,
      carMileage: 1355,
      carImage: 'check.jpeg',
      city: 'Cebu',
      barangay: 'Cansubing',
    }
    component.crud.editCarForm.setValue(mockCar)
    fixture.detectChanges();
    expect(component.crud.editCarForm.valid).toEqual(true);
  })
  it('form should be invalid',()=>{
    const mockCar = {
      $carKey: '1',
      carName: '',
      carColor: '',
      carRentPrice: 146,
      carMileage: 1355,
      carImage: 'check.jpeg',
      city: 'Cebu',
      barangay: 'Cansubing',
    }
    component.crud.editCarForm = mockCarForm;
    component.crud.editCarForm.setValue(mockCar)
    fixture.detectChanges();
    expect(component.crud.editCarForm.valid).toEqual(false);
  })
  it('if form is valid, call edit cars and close dialog',()=>{
    const element = fixture.nativeElement;
    const input = element.querySelector('#carImage');
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const mockCar = {
      $carKey: '1',
      carName: 'asd',
      carColor: 'asd',
      carRentPrice: 146,
      carMileage: 1355,
      carImage: 'check.jpeg',
      city: 'Cebu',
      barangay: 'Cansubing',
    }
    component.crud.editCarForm = mockCarForm;
    component.crud.editCarForm.setValue(mockCar)
    expect(component.crud.editCarForm.valid).toBeTrue();
    component.onSubmitUpdate();
    fixture.detectChanges();
  })
  
});

