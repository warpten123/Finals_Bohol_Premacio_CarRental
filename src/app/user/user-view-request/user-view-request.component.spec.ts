import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserViewRequestComponent } from './user-view-request.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {  MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserViewRequestComponent', () => {
  let component: UserViewRequestComponent;
  let fixture: ComponentFixture<UserViewRequestComponent>;

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
      declarations: [ UserViewRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
