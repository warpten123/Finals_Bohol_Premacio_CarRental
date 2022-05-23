import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAvailableComponent } from './admin-available.component';

describe('AdminAvailableComponent', () => {
  let component: AdminAvailableComponent;
  let fixture: ComponentFixture<AdminAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAvailableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
