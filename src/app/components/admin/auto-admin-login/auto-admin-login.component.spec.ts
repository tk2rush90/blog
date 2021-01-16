import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoAdminLoginComponent } from './auto-admin-login.component';

describe('AutoAdminLoginComponent', () => {
  let component: AutoAdminLoginComponent;
  let fixture: ComponentFixture<AutoAdminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoAdminLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoAdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
