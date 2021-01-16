import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsIntroComponent } from './components-intro.component';

describe('ComponentsIntroComponent', () => {
  let component: ComponentsIntroComponent;
  let fixture: ComponentFixture<ComponentsIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
