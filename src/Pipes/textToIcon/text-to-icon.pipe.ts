import { Pipe, PipeTransform } from '@angular/core';
import { Icon } from '../../Models/icon';

@Pipe({
  name: 'textToIcon',
  standalone: true
})
export class TextToIconPipe implements PipeTransform {
   iconsList: Icon[] = [
    new Icon(1, "עריכה", 'fa fa-pencil'),          // Edit icon
    new Icon(2, "מחיקה", 'fa fa-trash'),           // Trash icon
    new Icon(3, "smile", 'far fa-smile'),           // Smile icon
    new Icon(4, "frown", 'far fa-frown'),           // Frown icon
    new Icon(5, "arrows", 'fas fa-arrows-alt'),     // Arrows icon
    new Icon(6, "join", 'fa fa-user-plus'),        // User plus icon
    new Icon(7, "leave", 'fa fa-user-times')       // User minus icon
];
  transform(value: string) {
    
    
    let icon=this.iconsList.find(item=>item._name==value)
    
    return `<i class="${icon?._class}"></i>`  ;
  }

}
