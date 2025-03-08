import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLogComponent } from './button-log.component';

describe('ButtonLogComponent', () => {
  let component: ButtonLogComponent;
  let fixture: ComponentFixture<ButtonLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
