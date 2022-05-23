import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRentedComponent } from './admin-rented.component';

describe('AdminRentedComponent', () => {
  let component: AdminRentedComponent;
  let fixture: ComponentFixture<AdminRentedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRentedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
