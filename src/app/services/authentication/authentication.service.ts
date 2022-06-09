import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$: any;
  constructor(

    private firebaseAuth: AngularFireAuth,
    ) { }

  // login(email: string, password: string){
  //   return from(signInWithEmailAndPassword(this.auth,email,password));
  // }
   login(email: string, password: string){
    return  from(this.firebaseAuth.signInWithEmailAndPassword(email,password))
  }
  

  logout(){
      return from(this.firebaseAuth.signOut());
  }
  register(email: string, password: string){
    return from(this.firebaseAuth.createUserWithEmailAndPassword(email,password))
  }
  // delete(){
  //   var user = this.firebaseAuth.currentUser;
  //   user?.delete().then(function() {
  //     // User deleted.
  //   }).catch(function() {
  //     // An error happened.
  //   });
  // }
}
