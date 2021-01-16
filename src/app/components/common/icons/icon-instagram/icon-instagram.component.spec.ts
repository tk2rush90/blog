import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconInstagramComponent } from './icon-instagram.component';

describe('IconInstagramComponent', () => {
  let component: IconInstagramComponent;
  let fixture: ComponentFixture<IconInstagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconInstagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconInstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
