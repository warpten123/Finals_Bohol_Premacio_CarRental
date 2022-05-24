import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, authState, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/compat';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);
  constructor(private auth: Auth, 
    ) { }

  login(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth,email,password));
  }
  logout(){
      return from(this.auth.signOut());
  }
  register(email: string, password: string){
    return from(createUserWithEmailAndPassword(this.auth,email,password))
  }
  delete(){
    var user = this.auth.currentUser;
    user?.delete().then(function() {
      // User deleted.
    }).catch(function() {
      // An error happened.
    });
  }
}
