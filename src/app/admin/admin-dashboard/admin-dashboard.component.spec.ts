import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS, AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication/authentication.service'
describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: 
      [
        AuthenticationService,
        { provide: MatDialog, useValue: {}},
        { provide: MatDialogRef, useValue: {}}
      ],
      declarations: [ AdminDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // should have a list of users
  it('should have a list of users', () => {
    expect(component.users).toBeTruthy();
  });

  // should return a collection of users from the database
  // it('should return a collection of users from the database', () => {
  //   const userResponse = [
  //     {
  //       id: '1',
  //       email: 'cris.bacus6@gmail.com',
  //       password: '123456',

  //   ]

});
