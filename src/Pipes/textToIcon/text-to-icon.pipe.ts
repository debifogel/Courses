import { Pipe, PipeTransform } from '@angular/core';
import { Icon } from '../../Models/icon';

@Pipe({
  name: 'textToIcon',
  standalone: true
})
export class TextToIconPipe implements PipeTransform {
  iconsList: Icon[] = [new Icon(1,"עריכה",'fas fa-pen'), new Icon(2,"מחיקה",'fas fa-trash-alt'),
    new Icon(3,"smile",'far fa-smile'),new Icon(4,"frown", 'far fa-frown'),new Icon(5,"arrows" ,'fas fa-arrows-alt'),new Icon(6,"join" ,'fas fa-user-plus'),new Icon(7,"leave" ,'fas fa-user-minus')];
  transform(value: string) {
    
    
    let icon=this.iconsList.find(item=>item._name==value)
    
    return `<i class="${icon?._class}"></i>`  ;
  }

}
