import { of, Observable } from 'rxjs';
import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {  MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let email: string = "paul@gmail.com";
  let password: string = "123456";
  let mockFireAuthService: AngularFireAuth;
  const authStub: any = {
    authState: {},
    auth: {
      signInWithEmailAndPassword(email: string, password: string) {
        return Promise.resolve();
      }
    }
  };
  beforeEach(() => {
    // mockFireAuthService = jasmine.createSpyObj<AngularFireAuth>('AngularFireAuth',['signInWithEmailAndPassword'])
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [
        {provide: AngularFireAuth, useValue: authStub},
        {provide: AngularFirestore},
        AuthenticationService,
      ],

    });
    authStub.authState = of(null);
    service = TestBed.inject(AuthenticationService);
    
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // it('should call signInWithPasswordAndEmail', inject([AuthenticationService], (service: AuthenticationService) => {
  //   const mock = TestBed.get(AngularFireAuth);
  //   mock.auth = authStub.auth;
  //   const spy = spyOn(mock.auth, 'signInWithEmailAndPassword').and.callThrough();
  //   service.login(email, password);
  //   expect(spy).toHaveBeenCalledWith(email, password);
  // }));
});
