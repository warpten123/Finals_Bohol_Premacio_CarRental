import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminRentedComponent } from './admin-rented.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {  MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminRentedComponent', () => {
  let component: AdminRentedComponent;
  let fixture: ComponentFixture<AdminRentedComponent>;

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
      declarations: [ AdminRentedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
