import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconWebComponent } from './icon-web.component';

describe('IconWebComponent', () => {
  let component: IconWebComponent;
  let fixture: ComponentFixture<IconWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
