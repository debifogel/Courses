import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LonlyCourseFormComponent } from './lonly-course-form.component';

describe('LonlyCourseFormComponent', () => {
  let component: LonlyCourseFormComponent;
  let fixture: ComponentFixture<LonlyCourseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LonlyCourseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LonlyCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
