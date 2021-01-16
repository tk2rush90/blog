import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsHomeComponent } from './components-home.component';

describe('ComponentsHomeComponent', () => {
  let component: ComponentsHomeComponent;
  let fixture: ComponentFixture<ComponentsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
