import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTitleInputComponent } from './post-title-input.component';

describe('PostTitleInputComponent', () => {
  let component: PostTitleInputComponent;
  let fixture: ComponentFixture<PostTitleInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTitleInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTitleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
