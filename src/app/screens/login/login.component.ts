import { Observable, Subscription, Subject } from 'rxjs';
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
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  
  fUserEmailFound!: boolean;
  fUserPassFound!: boolean;
  emailLogin: any;
  passLogin: any;
  userEmail: any;
  userPass: any;
  temp_User: UsersInterface[]=[];
  checkUser!: Subject<UsersInterface>;
  checkUser2!: UsersInterface;
  curr_User!: UsersInterface;
  count: number = 0;
  found: boolean = false;
  constructor(
    private router: Router,
    private crud: UsersService,
    private afs: AngularFirestore,
    private authService: AuthenticationService,
    private toast: HotToastService,
    private crudUser: UsersService,
    ) { }
  users!: Observable<UsersInterface[]>;
  ngOnInit(): void {
   
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
    if (!this.registerForm.valid) {
      this.toast.error("Invalid Registration");
      return;
    }
    this.authService.register(this.registerForm.value.email,this.registerForm.value.password).pipe(
      this.toast.observe({
        success: 'Registered Successfully!',
        loading: 'Processing',
        error: (message) => `${message}`
      })
    ).subscribe(()=>{
      this.nav('/user-dashboard');
    });
       const payload: UsersInterface = {
        $key: '',
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        age: this.registerForm.value.age,
        password: this.registerForm.value.password,
        money: 0,
        rentedVehicles: [],
      };
        this.crud.addUsers(payload);
        this.registerForm.reset();
     
  } //end register
  onSubmitLogin() {
    if (!this.loginForm.valid) {
      this.toast.error("Invalid Login");
      return;
    }
      this.authService.login(this.loginForm.value.emailLogin,this.loginForm.value.passLogin).pipe(
        this.toast.observe({
          success: 'Logged In Sucessfully',
          loading: 'Loading',
          error: 'There was a problem with your login.'
        })
      ).subscribe(()=>{
        this.nav('user-dashboard');

      });
      
     
    
  }//end submit
 
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}

