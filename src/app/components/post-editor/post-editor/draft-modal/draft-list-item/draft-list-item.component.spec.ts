import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftListItemComponent } from './draft-list-item.component';

describe('DraftListItemComponent', () => {
  let component: DraftListItemComponent;
  let fixture: ComponentFixture<DraftListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
