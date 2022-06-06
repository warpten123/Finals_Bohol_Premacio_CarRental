import { AngularFireAuth } from '@angular/fire/compat/auth';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { RequestRental } from './request-rental-interface';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestRentalService {
//PASS CAR DATA
passRentalValues$: Subject<RequestRental[]> = new Subject();
get passRentalValues(): Subject<RequestRental[]>{
  return this.passRentalValues$;
}
set passRentalValues(src: Subject<RequestRental[]>){
  this.passRentalValues$ = src;
}
getPassRentValue(rent: RequestRental[]){
  this.passRentalValues$.next(rent);
}
//END PASS CAR DATA
  private requestCollection!: AngularFirestoreCollection<RequestRental>;
  requests!: Observable<RequestRental[]>;
  search!: Observable<RequestRental[]>;
  constructor(private afs: AngularFirestore) {
    this.requestCollection = this.afs.collection<RequestRental>('pendingRentals'); // name sa collection
    this.requests = this.requestCollection.snapshotChanges().pipe(
      map((changes: any[]) =>{
        return changes.map(a => {
          const data = a.payload.doc.data() as RequestRental;
          data.$key = a.payload.doc.id;
          return data;
        });
      }));
  }
  getRentalRequests(){
    // console.log(this.requests); //get all items in the collection of cars
    return this.requests;
  }
  addRequest(requets: RequestRental) { // to add cars to the collection 'cars'
  const pushkey = this.afs.createId();
  requets.$key = pushkey;
  this.requestCollection.doc(pushkey).set(requets);
  }
  editRequest(requestId: string, request: RequestRental) { //get all the changes on the item and update
    this.requestCollection.doc(requestId).update(request);
  }
  deleteRequest(requestId: string) {//delete a single document in the cars collection
    this.requestCollection.doc(requestId).delete();
  }
  
}