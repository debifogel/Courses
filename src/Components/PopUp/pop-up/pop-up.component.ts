import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {
  @Input() text: string = '';
  
  @Output() buttonClickYes = new EventEmitter<void>();
  @Output() buttonClickNo = new EventEmitter<void>();
 
}
