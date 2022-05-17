import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { UsersInterface } from './user-interface';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
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
  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<UsersInterface>('test');
    this.users = this.usersCollection.valueChanges();
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
  searchUser(email: string){
    this.userData = this.afs.collection("test", ref => ref.where('email','==',email)).valueChanges();
    this.userData.subscribe((users: Observable<UsersInterface[]>[]) => {
    this.users = users[0]
      if(this.users == undefined){
        this.userFound = false;
        alert('User not found!');
      }
      else{
        this.userFound = true;
        alert('Welcome');
      }
        


    })
   return this.userFound;
 
  }
 
}
