import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAddModalComponent } from './video-add-modal.component';

describe('VideoAddModalComponent', () => {
  let component: VideoAddModalComponent;
  let fixture: ComponentFixture<VideoAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
