import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsAdminLoginComponent } from './components-admin-login.component';

describe('ComponentsAdminLoginComponent', () => {
  let component: ComponentsAdminLoginComponent;
  let fixture: ComponentFixture<ComponentsAdminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsAdminLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsAdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
