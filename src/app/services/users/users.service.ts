import { AngularFireAuth } from '@angular/fire/compat/auth';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { UsersInterface } from './user-interface';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { CRUDReturn } from 'src/app/models/crud_return.interface';
import { map } from 'rxjs/operators';
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

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
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
  removeUsers(userId: string) {
    this.usersCollection.doc(userId).delete();
  }
  getOneUsers(id: string) {
    return this.usersCollection.doc(id).get();
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
 
  
  get authenticated(): boolean {
    return this.users != undefined && this.users != null;
  }
}
