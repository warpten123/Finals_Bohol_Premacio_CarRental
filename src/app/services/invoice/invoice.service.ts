import { AngularFireAuth } from '@angular/fire/compat/auth';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { InvoiceInterface } from './invoice-interface';
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
export class InvoiceService {
    private invoiceCollection!: AngularFirestoreCollection<InvoiceInterface>;
    invoice!: Observable<InvoiceInterface[]>;
    search!: Observable<InvoiceInterface[]>;
    invoiceData: any;
    constructor(private afs: AngularFirestore,
        private afAuth: AngularFireAuth) {
        this.invoiceCollection = this.afs.collection<InvoiceInterface>('invoices'); // name sa collection
        //this.users = this.usersCollection.valueChanges();
        this.invoice = this.invoiceCollection.snapshotChanges().pipe(//basically just to get the id from collection katong random ass numbers
            map((changes: any[]) => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as InvoiceInterface;
                    data.$invoiceKey = a.payload.doc.id;
                    return data;
                });
            }));
    }
}
