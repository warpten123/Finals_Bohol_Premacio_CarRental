import { UsersInterface } from '../../services/users/user-interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { User } from '../../../../src/app/models/user.model';
import { AuthService } from '../../../../src/app/shared/auth.service';
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // constructor(private router: Router, private api: ApiService, private auth: AuthService) { }

  // ngOnInit(): void {
  //   console.log('login');
  // }

  // logInForm: FormGroup = new FormGroup({
  //   fCEmail: new FormControl('', Validators.required),
  //   fCPassword: new FormControl('', Validators.required)
  // });

  // fcEmail = new FormControl();
  // fcPassword = new FormControl();
  // requestResult = '';

  // error = '';
  // async login() {
  //   try {
  //     this.error = '';
  //     var result: any = await this.auth.login(
  //       this.fcEmail.value,
  //       this.fcPassword.value
  //     );
  //     console.log(result);
  //     if (!this.auth.authenticated) {
  //       this.error = result.data;
  //       alert(result.data);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  // nav(destination: string) {
  //   this.router.navigate([destination]);
  // }
  clickLogin!: boolean;
  clickRegister!: boolean;
  test: any;
  userFound!: boolean;
  emailLogin: any;
  passLogin: any;
  constructor(private fb: FormBuilder, private crud: UsersService) { }

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
    name: new FormControl(['', Validators.required]),
    email: new FormControl([
      '',
      {
        validators: [Validators.required, Validators.email],
      },
    ]),
    age: new FormControl(['', Validators.required]),
  });

  error: string = '';

  onSubmitRegister() {
    if (this.clickRegister) {
      const payload: UsersInterface = {
        $key: '',
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        age: this.registerForm.value.age,
      };
      this.crud.addUsers(payload);
      // this.form.reset();
      alert('Registered!');
    }
  }

  onSubmitLogin() {
    if (!this.loginForm.valid) {
      {
        this.error = 'No fields must be empty';
        alert(this.error);
        return;
      }
    }
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
      alert('Hellow')
      var exist: boolean;
      exist = this.crud.searchUser(this.loginForm.value.emailLogin);
      console.log(exist)
      if(exist){
        alert('User found');
        // nav home
      }
      else{
        alert('User not found!!!');
      }
  }
}
  validateClickRegister() {
    console.log('click register');
    this.clickRegister = true;
  }
  validateClickLogin() {
    console.log('click login');
    this.clickLogin = true;
    if (this.emailLogin.value == '' && this.passLogin.value == '') {
      this.clickLogin = false;
    }
  }
}