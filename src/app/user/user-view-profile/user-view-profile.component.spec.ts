import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserViewProfileComponent } from './user-view-profile.component';

describe('UserViewProfileComponent', () => {
  let component: UserViewProfileComponent;
  let fixture: ComponentFixture<UserViewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ UserViewProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
