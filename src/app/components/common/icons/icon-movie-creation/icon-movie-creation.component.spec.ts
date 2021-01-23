import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconMovieCreationComponent } from './icon-movie-creation.component';

describe('IconMovieCreationComponent', () => {
  let component: IconMovieCreationComponent;
  let fixture: ComponentFixture<IconMovieCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconMovieCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconMovieCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
