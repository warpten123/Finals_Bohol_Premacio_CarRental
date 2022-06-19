import { CarsInterface } from 'src/app/services/cars/cars-interface';
import { CarsService } from './../../services/cars/cars.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminAddComponent } from './admin-add.component';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {  AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { By } from '@angular/platform-browser';
import { HotToastService, HotToastModule } from '@ngneat/hot-toast';
import { Observable,of,from } from 'rxjs';
import { Router } from '@angular/router';
///MOCK///
const mockCar: CarsInterface = {
  $carKey: '',
  carName: "Toyota",
  carColor: "Red",
  carRentPrice: 1500000,
  carMileage: 145,
  carStatus: "Available",
  carImage: "test.jpg",
  carLocation: {
    city: "Cebu",
    barangay: "Buagsong",
  }
}


///END MOCK///


xdescribe('Admin Add - TS Testing', () => {
  let component: AdminAddComponent;
  let fixture: ComponentFixture<AdminAddComponent>;
  let toastService: jasmine.SpyObj<HotToastService>;
  let testCrudCar: jasmine.SpyObj<CarsService>;;
  let angularFireStore: AngularFirestore;
  let router: jasmine.SpyObj<Router>;
  beforeEach(async () => {
     toastService = jasmine.createSpyObj<HotToastService>('HotToastService',['error','success'])
     testCrudCar = jasmine.createSpyObj<CarsService>('CarsService',['addCars','getCars','modifyCars'])
     router = jasmine.createSpyObj<Router>('Router',['navigate'])
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        HotToastModule,
      ],
      providers:[
        {provide: HotToastService, useValue: toastService},
        {provide: CarsService, useValue: testCrudCar },
      ],
      declarations: [ AdminAddComponent ]
      
    })
    .compileComponents();
     
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddComponent);
    testCrudCar = TestBed.get(CarsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit is called',() =>{
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  })
  
  
  it('should call clearImage() when button is clicked',() =>{
    spyOn(component,'clearImage').and.callThrough();
    let click = fixture.debugElement.query(By.css('#clearButton')).nativeElement;
    click.click();
    fixture.detectChanges();
    expect(component.clearImage).toHaveBeenCalled();
  })
  it('should call onSubmitAdd() when button is clicked',() =>{
    spyOn(component,'onSubmitAdd').and.callThrough();
    let click = fixture.debugElement.query(By.css('#submitButton')).nativeElement;
    click.click();
    fixture.detectChanges();
    expect(component.onSubmitAdd).toHaveBeenCalled();
  })
  it('should contain label in button: Clear',() =>{
    let label = fixture.debugElement.query(By.css('#clearButton')).nativeElement;
    fixture.detectChanges()
    expect(label.textContent).toBe('Clear'); 
  })
  it('should contain label in button: Add',() =>{
    let label = fixture.debugElement.query(By.css('#submitButton')).nativeElement;
    fixture.detectChanges()
    expect(label.value).toBe('Add'); 
  })
  // it('should call onFileChanged() when user picks image',() =>{
  //   const dataTransfer = new DataTransfer();
  //   dataTransfer.items.add(new File([''], 'test-file.jpg'))
  //   const inputDebugEl  = fixture.debugElement.query(By.css('input[type=file]'));
  //   inputDebugEl.nativeElement.files = dataTransfer.files;
  //   inputDebugEl.nativeElement.dispatchEvent(new InputEvent('change'));
  //   fixture.detectChanges();
  //   expect(component.url).toBeTruthy()
  //   expect(component.url).toBe('test-file.jpg')
  // })
  it('should call OnFileChanged() when user uploads a file', () => {
    const element = fixture.nativeElement;
    const input = element.querySelector('#carImage');
    spyOn(component, 'onFileChanged');
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.onFileChanged).toHaveBeenCalled();
  });
  it('form should be invalid',() => {
    component.adminAddForm.setValue({
      carName: "",
      carColor: "",
      carPrice: "",
      carMileage: "",
      carBarangay: "",
      carCity: "",
    })
    expect(component.adminAddForm.valid).toEqual(false);
  })
  it('form should be true',() => {
    component.adminAddForm.setValue({
      carName: "Toyota",
      carColor: "Red",
      carPrice: "16000",
      carMileage: "150",
      carBarangay: "Buagsong",
      carCity: "Cordova",
    })
    expect(component.adminAddForm.valid).toEqual(true);
  })
  it('should show toast pop-up error if submit button is clicked while form is invalid',() => {
    component.adminAddForm.setValue({
      carName: "",
      carColor: "",
      carPrice: "",
      carMileage: "150",
      carBarangay: "Buagsong",
      carCity: "Cordova",
    })
    component.onSubmitAdd();
    expect(component.adminAddForm.valid).toEqual(false);
    expect(toastService.error).toHaveBeenCalledWith('Please Complete All Fields!');
  })
  it('should contain label: Add Cars',() =>{
    let label = fixture.debugElement.query(By.css('#titleAddCars')).nativeElement;
    fixture.detectChanges()
    expect(label.textContent).toBe('Add Cars'); 
  })
  it('Placeholder text should have label: Car Name ',() =>{
    let label = document.getElementById('carName');
    fixture.detectChanges()
    expect(label?.getAttribute('placeholder')).toEqual("Car Name");
  })
  it('Placeholder text should have label: Color ',() =>{
    let label = document.getElementById('carColor');
    fixture.detectChanges()
    expect(label?.getAttribute('placeholder')).toEqual("Color");
  })
  it('Placeholder text should have label: Rent Price ',() =>{
    let label = document.getElementById('carPrice');
    fixture.detectChanges()
    expect(label?.getAttribute('placeholder')).toEqual("Rent Price");
  })
  it('Placeholder text should have label: Mileage (Kilometers) ',() =>{
    let label = document.getElementById('carMileage');
    fixture.detectChanges()
    expect(label?.getAttribute('placeholder')).toEqual("Mileage (Kilometers)");
  })
  it('Placeholder text should have label: This car is already listed as Available ',() =>{
    let label = document.getElementById('carStatus');
    fixture.detectChanges()
    expect(label?.getAttribute('placeholder')).toEqual("This car is already listed as Available");
  })
 
 it('should show default image if no image of a car is chosen',() =>{
  component.validImage = false;
  fixture.detectChanges();
  let resultBlock = fixture.debugElement.query(By.css('#carImg'));
  expect(resultBlock).not.toBeNull();
})
it('should show the image of the chosen car',() =>{
  component.validImage = true;
  fixture.detectChanges();
  let resultBlock = fixture.debugElement.query(By.css('#carImg'));
  expect(resultBlock).not.toBeNull();
})
it('Placeholder text should have label: Upload Image ',() =>{
  let label = document.getElementById('carImage');
  fixture.detectChanges()
  expect(label?.getAttribute('placeholder')).toEqual("Upload Image");
})
it('Placeholder text should have label: Brgy ',() =>{
  let label = document.getElementById('carBarangay');
  fixture.detectChanges()
  expect(label?.getAttribute('placeholder')).toEqual("Brgy");
})
it('Placeholder text should have label: City ',() =>{
  let label = document.getElementById('carCity');
  fixture.detectChanges()
  expect(label?.getAttribute('placeholder')).toEqual("City");
}) 

it('should show toast pop-up sucess if submit button is clicked while form is valid',() => {
  
  component.onSubmitAdd();
  const element = fixture.nativeElement;
  const input = element.querySelector('#carImage');
  input.dispatchEvent(new Event('change'));
  fixture.detectChanges();
  const payload = {
    carName: "Toyota",
    carColor: "Red",
    carPrice: 1500000,
    carMileage: 1500,
    carCity: "Cebu",
    carBarangay: "Buagsong",   
  }
  component.adminAddForm.setValue(payload);
  expect(component.adminAddForm.valid).toBeTrue();
  component.onSubmitAdd();
  fixture.detectChanges();
})

});//end describe
