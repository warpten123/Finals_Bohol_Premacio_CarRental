import { AngularFireAuth } from '@angular/fire/compat/auth';
import { where } from 'firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { CarsInterface } from './cars-interface';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private carsCollection!: AngularFirestoreCollection<CarsInterface>;
  cars!: Observable<CarsInterface[]>;
  search!: Observable<CarsInterface[]>;
  carData: any;
  image!: any;
  //PASS CAR DATA
  passCarsValues$: Subject<CarsInterface> = new Subject();
  get passCarsValues(): Subject<CarsInterface>{
    return this.passCarsValues$;
  }
  set passCarsValues(src: Subject<CarsInterface>){
    this.passCarsValues$ = src;
  }
  getPassCarValue(car: CarsInterface){
    this.passCarsValues$.next(car);
  }
  //END PASS CAR DATA
  constructor(private afs: AngularFirestore) {
    this.carsCollection = this.afs.collection<CarsInterface>('cars'); // name sa collection
    //this.users = this.usersCollection.valueChanges();
    this.cars = this.carsCollection.snapshotChanges().pipe(//basically just to get the id from collection katong random ass numbers
      map((changes: any[]) =>{
        return changes.map(a => {
          const data = a.payload.doc.data() as CarsInterface;
          data.$carKey = a.payload.doc.id;
          return data;
        });
      }));
  }
  addCars(cars: CarsInterface) { // to add cars to the collection 'cars'
    const pushkey = this.afs.createId();
    cars.$carKey = pushkey;
    this.carsCollection.doc(pushkey).set(cars);
  }
  getCars() { //get all items in the collection of cars
    return this.cars;
  }
  modifyCars(carId: string, carChanges: CarsInterface) { //get all the changes on the item and update
    this.carsCollection.doc(carId).update(carChanges);
  }
  removeCars(carId: string) {//delete a single document in the cars collection
    this.carsCollection.doc(carId).delete();
  }
  editCarForm: FormGroup = new FormGroup({
    $carKey: new FormControl('', Validators.required),
    carName: new FormControl('', Validators.required),
    carColor: new FormControl('', Validators.required),
    carRentPrice: new FormControl('', Validators.required),
    carMileage: new FormControl('', Validators.required),
    carImage: new FormControl(this.image),
    city: new FormControl('', Validators.required),
    barangay: new FormControl('', Validators.required),
    
  });

  populateForm(car: CarsInterface){
    this.editCarForm.patchValue(car);
  }

  
 

}
