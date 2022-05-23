import { AngularFireAuth } from '@angular/fire/compat/auth';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { RentalInterface } from './rental-interface';
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
export class RentalService {
    private rentalsCollection!: AngularFirestoreCollection<RentalInterface>;
    rents!: Observable<RentalInterface[]>;
    search!: Observable<RentalInterface[]>;
    rentData: any;
    constructor(private afs: AngularFirestore,
        private afAuth: AngularFireAuth) {
        this.rentalsCollection = this.afs.collection<RentalInterface>('rental'); // name sa collection
        //this.users = this.usersCollection.valueChanges();
        this.rents = this.rentalsCollection.snapshotChanges().pipe(//basically just to get the id from collection katong random ass numbers
            map((changes: any[]) => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as RentalInterface;
                    data.$rentalKey = a.payload.doc.id;
                    return data;
                });
            }));
    }
}
