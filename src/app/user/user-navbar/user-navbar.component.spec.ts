import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserNavbarComponent } from './user-navbar.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {  MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserNavbarComponent', () => {
  let component: UserNavbarComponent;
  let fixture: ComponentFixture<UserNavbarComponent>;

  beforeEach(async () => {
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

      declarations: [ UserNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
