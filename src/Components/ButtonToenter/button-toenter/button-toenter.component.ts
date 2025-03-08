import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-toenter',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './button-toenter.component.html',
  styleUrl: './button-toenter.component.css'
})
export class ButtonToenterComponent {
  @Input() text: string = 'Button';
  @Output() buttonClick = new EventEmitter<void>();


  onClick() {
    this.buttonClick.emit();
  }
}
