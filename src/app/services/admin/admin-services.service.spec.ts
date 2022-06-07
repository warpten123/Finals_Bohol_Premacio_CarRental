import { TestBed } from '@angular/core/testing';
import { AdminServicesService } from '../admin/admin-services.service';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {  MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminServicesService', () => {
  let service: AdminServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [
        { provide: MatDialog, useValue: {}},
        { provide: MatDialogRef, useValue: {}}
      ],
    });
    service = TestBed.inject(AdminServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
