import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconConstructionComponent } from './icon-construction.component';

describe('IconConstructionComponent', () => {
  let component: IconConstructionComponent;
  let fixture: ComponentFixture<IconConstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconConstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
