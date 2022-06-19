import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {  MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  beforeEach(async () => {
    router =  jasmine.createSpyObj<Router>('Router',['navigate']);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [
        { provide: MatDialog, useValue: {}},
        { provide: MatDialogRef, useValue: {}}
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   it('should click button and call on submit register',()=>{
    spyOn(component,'onSubmitRegister').and.callThrough();
    let click = fixture.debugElement.query(By.css('#register')).nativeElement;
    click.click();
    fixture.detectChanges();
    expect(component.onSubmitRegister).toHaveBeenCalled();
  })
  it('should click button and call on submit login',()=>{
    spyOn(component,'onSubmitLogin').and.callThrough();
    let click = fixture.debugElement.query(By.css('#login')).nativeElement;
    click.click();
    fixture.detectChanges();
    expect(component.onSubmitLogin).toHaveBeenCalled();
  })
  // it('should call nav to navigate',()=>{
  //  spyOn(component,'nav').and.callThrough();
  //  component.nav("user-dashboard");
  //  expect(component.nav).toHaveBeenCalled();
  // })
  it('loginForm should be valid',()=>{
    const payload = {
      emailLogin: "testing@gmail.com",
      passLogin: "123456",
    }
    component.loginForm.setValue(payload);
    expect(component.loginForm.valid).toBeTrue();
   })
   it('loginForm should be invalid',()=>{
    const payload = {
      emailLogin: "testing@gmail.com",
      passLogin: "",
    }
    component.loginForm.setValue(payload);
    expect(component.loginForm.valid).toBeFalse();
   })
   it('should logged in when form is valid',()=>{
    component.onSubmitLogin();
    const payload = {
      emailLogin: "testing@gmail.com",
      passLogin: "123456",
    }
    component.loginForm.setValue(payload);
    expect(component.loginForm.valid).toBeTrue();
    component.onSubmitLogin();
    fixture.detectChanges();
   })
   it('should register users when form is valid',()=>{
    component.onSubmitRegister();
    const payload = {
      $key: '',
      name: 'Premacio',
      email: 'paul@gmail.com',
      age: 19,
      password: '123456',
    }
    component.registerForm.setValue(payload);
    expect(component.registerForm.valid).toBeTrue();
    component.onSubmitRegister();
    fixture.detectChanges();
   })
  
   
});
