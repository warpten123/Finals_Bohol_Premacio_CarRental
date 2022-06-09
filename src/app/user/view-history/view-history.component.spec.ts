import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewHistoryComponent } from './view-history.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {  MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewHistoryComponent', () => {
  let component: ViewHistoryComponent;
  let fixture: ComponentFixture<ViewHistoryComponent>;

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

      declarations: [ ViewHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
