
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject } from 'rxjs';
import { UsersInterface } from './user-interface';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

import { arrayRemove, FieldValue} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersCollection!: AngularFirestoreCollection<UsersInterface>;
  users!: Observable<UsersInterface[]>;
  search!: Observable<UsersInterface[]>;
  userData: any;
  isLoggedIn = false;
  userFound = false;
//START USER PASS DATA
  passUserValues$: Subject<UsersInterface> = new Subject();
  get passUserValues(): Subject<UsersInterface>{
    return this.passUserValues$;
  }
  set passUserValues(src: Subject<UsersInterface>){
    this.passUserValues$ = src;
  }
  getPassUserValue(user: UsersInterface){
    // console.log("from service",user);
    this.passUserValues$.next(user);
  }
//END USER PASS DATA
  constructor(private afs: AngularFirestore, 
    private afAuth: AngularFireAuth) {
    this.usersCollection = this.afs.collection<UsersInterface>('users');
    //this.users = this.usersCollection.valueChanges();
    this.users = this.usersCollection.snapshotChanges().pipe(
      map((changes: any[]) =>{
        return changes.map(a => {
          const data = a.payload.doc.data() as UsersInterface;
          data.$key = a.payload.doc.id;
          return data;
        });
      }));
  }
  
  addUsers(users: UsersInterface) {
    const pushkey = this.afs.createId();
    users.$key = pushkey;
    this.usersCollection.doc(pushkey).set(users);
  }

  getUsers() {
    return this.users;
  }
  modifyUsers(userId: string, userChanges: UsersInterface) {
    this.usersCollection.doc(userId).update(userChanges);
  }
  updateUsers(user: UsersInterface){
    this.usersCollection.doc(`users/renred`).update(user);
    
  }
  removeUsers(userId: string) {
    this.usersCollection.doc(userId).delete();
  }
  // removeCarsFromUsers(carKey: string,index: number){
  //   this.usersCollection.doc().update(
  //     {
  //       rentedVehicles: FieldValue.arrayRemove(carKey)
  //     }
  //   );
  // }
  getOneUsers(email: string){
    this.userData = this.afs.collection("users", ref => ref.where('email','==',email)).valueChanges();
    this.userData.subscribe((userss: Observable<UsersInterface[]>[]) => {
    return this.users = userss[0];
    })
  }

  // searchUser(email: string){
  //   this.userData = this.afs.collection("users", ref => ref.where('email','==',email)).valueChanges();
  //   this.userData.subscribe((users: Observable<UsersInterface[]>[]) => {
  //   this.users = users[0]
  //     if(this.users == undefined){
  //       this.userFound = false;
  //       // alert('User not found!');
  //     }
  //     else{
  //       this.userFound = true;
  //       // alert('Welcome');
  //     }
        


  //   })
  //  return this.userFound;
 
  // }
 
  
 
}
