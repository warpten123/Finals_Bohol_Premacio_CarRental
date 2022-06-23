import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminNavbarComponent } from './admin-navbar.component';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
describe('AdminNavbarComponent', () => {
  let component: AdminNavbarComponent;
  let fixture: ComponentFixture<AdminNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      declarations: [ AdminNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('logout button is clicked and logout is called',()=>{
    spyOn(component, 'logout').and.callThrough();
    let click = fixture.debugElement.query(By.css('#logout')).nativeElement;
    click.click();
    fixture.detectChanges();
    expect(component.logout).toHaveBeenCalled();
  })
  
  
});
