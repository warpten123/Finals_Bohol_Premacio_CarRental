import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserViewRequestComponent } from './user-view-request.component';

describe('UserViewRequestComponent', () => {
  let component: UserViewRequestComponent;
  let fixture: ComponentFixture<UserViewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
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
