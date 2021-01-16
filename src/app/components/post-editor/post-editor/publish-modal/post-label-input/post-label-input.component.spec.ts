import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLabelInputComponent } from './post-label-input.component';

describe('PostLabelInputComponent', () => {
  let component: PostLabelInputComponent;
  let fixture: ComponentFixture<PostLabelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostLabelInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLabelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
