import { AngularFireAuth } from '@angular/fire/compat/auth';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { UsersInterface } from './user-interface';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { CRUDReturn } from 'src/app/models/crud_return.interface';
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
  async login(email: string, password: string): Promise<any> {
    try {
      //log in to firebase auth
      var resultOfLogin: any;
      try {
        resultOfLogin = await this.afAuth.signInWithEmailAndPassword(
          email,
          password
        );
      } catch (error) {
        throw error;
      }
      //get the data from the db regarding the user
      var result: any = await this.getOneUsers(resultOfLogin.user?.uid);
      var output: CRUDReturn = { success: result.success, data: result.data };
      if (output.success === true) {
        console.log('Subscription');
        this.userData = output.data;
        console.log('Successful Login');
        this.userData?.log();
        this.isLoggedIn = true;
        this.userFound = true;
      }
      return output;
    } catch (error) {
      console.log('Login Error');
      if (error instanceof Error)
        return { success: false, data: error.message };
      else return { success: false, data: 'unknown login error' };
    }
  }
  
  get authenticated(): boolean {
    return this.users != undefined && this.users != null;
  }
}
