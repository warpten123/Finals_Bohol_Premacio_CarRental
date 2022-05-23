import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewRequestComponent } from './user-view-request.component';

describe('UserViewRequestComponent', () => {
  let component: UserViewRequestComponent;
  let fixture: ComponentFixture<UserViewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
