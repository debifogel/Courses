import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonToenterComponent } from './button-toenter.component';

describe('ButtonToenterComponent', () => {
  let component: ButtonToenterComponent;
  let fixture: ComponentFixture<ButtonToenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonToenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonToenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
