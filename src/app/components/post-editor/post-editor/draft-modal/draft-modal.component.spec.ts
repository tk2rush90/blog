import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftModalComponent } from './draft-modal.component';

describe('DraftModalComponent', () => {
  let component: DraftModalComponent;
  let fixture: ComponentFixture<DraftModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
