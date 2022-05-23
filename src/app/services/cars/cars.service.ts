import { AngularFireAuth } from '@angular/fire/compat/auth';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { CarsInterface } from './cars-interface';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private carsCollection!: AngularFirestoreCollection<CarsInterface>;
  cars!: Observable<CarsInterface[]>;
  search!: Observable<CarsInterface[]>;
  carData: any;
  constructor(private afs: AngularFirestore, 
    private afAuth: AngularFireAuth) {
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


}
