import { UsersService } from 'src/app/services/users/users.service';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS, AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication/authentication.service'
import { CarsService } from 'src/app/services/cars/cars.service';
describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let mockUserService: any;
  let USERS: any;
  USERS = [
    {$key: '',name: 'john',email: 'john@gmail.com', age: 20, pasword: "123123", money: 123132, rentedVehicles: ['asda','asd']},
    {$key: '',name: 'doe',email: 'doe@gmail.com', age: 20, pasword: "123123", money: 123132, rentedVehicles: ['asda','asd']},
  ];
  beforeEach(async () => {
    
    mockUserService = jasmine.createSpyObj<UsersService>('UsersService',['getUsers', 'addUsers'])
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
        { provide: MatDialogRef, useValue: {}},
        { provide: UsersService, useValue: mockUserService},
      ],
      declarations: [ AdminDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockUserService.getUsers.and.returnValue(of(USERS));
    fixture = TestBed.createComponent(AdminDashboardComponent);
    mockUserService = TestBed.get(UsersService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // should have a list of users
  it('should have a list of users', () => {
    expect(component.users).toBeTruthy();
  });
  it('ngOnInit is called', () => {
    spyOn(component,'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  })
  it('should get list of users from the user service', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(mockUserService.getUsers).toHaveBeenCalled();
  });

  

});
