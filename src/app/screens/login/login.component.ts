import { UsersInterface } from './../../services/user-interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { User } from '../../../../src/app/models/user.model';
import { AuthService } from '../../../../src/app/shared/auth.service';
import { UsersService } from '../../services/users.service'

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
  constructor(private fb: FormBuilder, private crud: UsersService) { }

  ngOnInit(): void {
    this.clickLogin = false;
    this.clickRegister = false;
  }
 form = this.fb.group({
   $key: [''],
   name: ['',Validators.required],
   email: [
    '',
    {
      validators: [Validators.required, Validators.email],
    },
  ],
   age: ['',Validators.required],
 });

 onSubmitRegister(){
   if(this.clickRegister){
    const payload: UsersInterface = {
      $key: '',
      name: this.form.value['name'],
      age: this.form.value['age'],
      email: this.form.value['email'],
    };
    this.crud.addUsers(payload);
    this.form.reset();
    alert('Registered!');
   
   }
 }

  onSubmitLogin(id: string) {
   this.userFound = this.crud.searchUser(id);
 }
 validateClickRegister(){
  console.log('click register');
   this.clickRegister = true;
 }
 validateClickLogin(){
   console.log('click login');
  this.clickLogin = true;
}
 get f() {
  return this.form.controls;
}


}