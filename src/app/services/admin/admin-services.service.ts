import { AdminInterface } from './admin-interface';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {
  private adminCollection!: AngularFirestoreCollection<AdminInterface>;
  admins!: Observable<AdminInterface[]>;
  search!: Observable<AdminInterface[]>;
  adminData: any;
  isLoggedIn = false;
  adminFound = false;
  constructor(private afs: AngularFirestore) {
    this.adminCollection = this.afs.collection<AdminInterface>('admin');
    this.admins = this.adminCollection.valueChanges();
  }
  addAmin(users: AdminInterface) {
    const pushkey = this.afs.createId();
    users.$key = pushkey;
    this.adminCollection.doc(pushkey).set(users);
  }
  getAdmins() {
    return this.admins;
  }
  modifyAdmin(adminId: string, adminChanges: AdminInterface) {
    this.adminCollection.doc(adminId).update(adminChanges);
  }
  removeAdmin(adminId: string) {
    this.adminCollection.doc(adminId).delete();
  }
  getOneAdmin(id: string) {
    return this.adminCollection.doc(id).get();
  }
  // searchAdmin(adminKey: string){
  //   this.adminData = this.afs.collection("admin", ref => ref.where('adminKey','==',adminKey)).valueChanges();
  //   this.adminData.subscribe((admins: Observable<AdminInterface[]>[]) => {
  //   this.admins = admins[0]
  //     if(this.admins == undefined){
  //       this.adminFound = false;
  //       alert('Admin not Found!');
  //     }
  //     else{
  //       this.adminFound = true;
  //       alert('Welcome Administrator!');
  //     }
        


  //   })
  //  return this.adminFound;
 
  // }
  
 
}
