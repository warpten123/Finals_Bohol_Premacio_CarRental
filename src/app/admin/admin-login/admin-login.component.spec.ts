
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLoginComponent } from './admin-login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
// import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers:[
        AuthenticationService,
       
        
      ],
      declarations: [ AdminLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoginComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('admin form should be valid',()=>{
    const mockAdmin = {
      $key: '',
      adminEmail: "admin@gmail.com",
      adminPass: "123456",
    }
    component.adminLoginForm.setValue(mockAdmin);
    expect(component.adminLoginForm.valid).toBeTrue();
  })
  it('admin form should be invalid',()=>{
    const mockAdmin = {
      $key: '',
      adminEmail: "",
      adminPass: "123456",
    }
    component.adminLoginForm.setValue(mockAdmin);
    expect(component.adminLoginForm.valid).toBeFalse();
  })
  it('submit button is clicked and onSubmitAdmin is called',()=>{
    spyOn(component, 'onSubmitAdmin').and.callThrough();
    let click = fixture.debugElement.query(By.css('#adminGo')).nativeElement;
    click.click();
    fixture.detectChanges();
    expect(component.onSubmitAdmin).toHaveBeenCalled();
  })
  it('admin form is valid and admin logs in',()=>{
    const mockAdmin = {
      $key: '',
      adminEmail: "admin@gmail.com",
      adminPass: "123456",
    }
    component.adminLoginForm.setValue(mockAdmin);
    expect(component.adminLoginForm.valid).toBeTrue();
    component.onSubmitAdmin();
    fixture.detectChanges();
  })
  // it('should navigate to admin-dashboard',()=>{
  //   const spy = spyOn(router,'navigate').and.callThrough();
  //   const mockAdmin = {
  //     $key: '',
  //     adminEmail: "admin@gmail.com",
  //     adminPass: "123456",
  //   }
  //   component.adminLoginForm.setValue(mockAdmin);
  //   expect(component.adminLoginForm.valid).toBeTrue();
  //   component.onSubmitAdmin();
  //   fixture.detectChanges();
  //   expect(spy).toHaveBeenCalledWith(['/admin-dashboard']);
    
    
  // })

    
 
});
