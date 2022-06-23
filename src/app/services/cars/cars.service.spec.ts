import { CarsInterface } from './cars-interface';
import { Subject } from 'rxjs';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CarsService } from './cars.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
describe('CarsService', () => {
  let service: CarsService;
  let CARS: any;
  
  CARS = {
    $carKey: '9L4Qj0WjdXy547jqPN4Y',
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
  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports:[
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(CarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getPassCarValue', () => {
    spyOn(service, 'getPassCarValue').and.callThrough();
    service.getPassCarValue(CARS);
    expect(service.getPassCarValue).toHaveBeenCalled();
  });
  it('should call getPassCarValueArray', () => {
    spyOn(service, 'getPassCarValueArray').and.callThrough();
    service.getPassCarValueArray(CARS);
    expect(service.getPassCarValueArray).toHaveBeenCalled();
  });
  it('should call getCars', () => {
    spyOn(service, 'getCars').and.callThrough();
    service.getCars();
    expect(service.getCars).toHaveBeenCalled();
  });
  it('should call addCars', () => {
    spyOn(service, 'addCars').and.callThrough();
    service.addCars(CARS);
    expect(service.addCars).toHaveBeenCalled();
  });
  it('should call modifyCars', () => {
    spyOn(service, 'modifyCars').and.callThrough();
    service.modifyCars("7FWbp6eyiMtAFtPLelc3",CARS);
    expect(service.modifyCars).toHaveBeenCalled();
  });
  it('should call removeCars', () => {
    spyOn(service, 'removeCars').and.callThrough();
    service.removeCars("7FWbp6eyiMtAFtPLelc3");
    expect(service.removeCars).toHaveBeenCalled();
  });
  it('should call populateForm', () => {
    spyOn(service, 'populateForm').and.callThrough();
    service.populateForm(CARS);
    expect(service.populateForm).toHaveBeenCalled();
  });
 
});
