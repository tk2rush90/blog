import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAddModalComponent } from './site-add-modal.component';

describe('SiteAddModalComponent', () => {
  let component: SiteAddModalComponent;
  let fixture: ComponentFixture<SiteAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
