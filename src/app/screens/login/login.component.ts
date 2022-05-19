import { Observable } from 'rxjs';
import { UsersInterface } from '../../services/users/user-interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { User } from '../../../../src/app/models/user.model';
import { AuthService } from '../../../../src/app/shared/auth.service';
import { UsersService } from '../../services/users/users.service'
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  clickLogin!: boolean;
  clickRegister!: boolean;
  test: any;
  userEmailFound!: boolean;
  userPassFound!: boolean;
  fUserEmailFound!: boolean;
  fUserPassFound!: boolean;
  emailLogin: any;
  passLogin: any;
  userEmail: any;
  userPass: any;
  constructor(private router: Router, private fb: FormBuilder, private crud: UsersService,private afs: AngularFirestore) { }
  users!: Observable<UsersInterface[]>;
  ngOnInit(): void {
    this.clickLogin = false;
    this.clickRegister = false;
  }

  loginForm: FormGroup = new FormGroup({
    emailLogin: new FormControl('', Validators.required),
    passLogin: new FormControl('', Validators.required)
  });

  registerForm: FormGroup = new FormGroup({
    $key: new FormControl(['']),
    name: new FormControl('', Validators.required),
    age: new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(65)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    // fcPassword2: new FormControl('', Validators.required),
  });

  error: string = '';

  onSubmitRegister() {
    if (this.registerForm.valid) {
      const payload: UsersInterface = {
        $key: '',
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        age: this.registerForm.value.age,
        password: this.registerForm.value.password,
      };
      console.log(payload);
        this.crud.addUsers(payload);
        alert('Registered!');
     
      
    }
  }
  onSubmitLogin() {
    if (this.loginForm.valid) {
      var payload: {
        email: string;
        password: string;
      };
      payload = {
        email: this.loginForm.value.emailLogin,
        password: this.loginForm.value.passLogin,
      };
      console.log(payload);
      ///checking email///
        this.userEmail = this.afs.collection("users", ref => ref.where('email','==',this.loginForm.value.emailLogin)).valueChanges();
        this.userEmail.subscribe((users: Observable<UsersInterface[]>[]) => {
        this.users = users[0]
          if(this.users == undefined){
            this.userEmailFound = false;
          }
          else{
            this.userEmailFound = true;
          }
          this.fUserEmailFound = this.userEmailFound;
          console.log(this.userEmailFound);
        
        })
       
    ///checking password///
        this.userPass = this.afs.collection("users", ref => ref.where('password','==',this.loginForm.value.passLogin)).valueChanges();
        this.userPass.subscribe((users: Observable<UsersInterface[]>[]) => {
          this.users = users[0]
            if(this.users == undefined){
              this.userPassFound = false;
            }
            else{
              this.userPassFound = true;
            }
            this.fUserPassFound = this.userPassFound;
            
        if(this.fUserEmailFound && this.fUserPassFound){
          alert("Credentials Accepted!");
          this.nav('home');
        }
        else{
          alert("Invalid Login");
        }
          
          })
          
          
    
      }// if login form is valid

    
  }
 
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}

