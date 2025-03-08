import { Component } from '@angular/core';
import { LessonServiceService } from '../../../Service/Lesson/lesson-service.service';
import { UserService } from '../../../Service/User/user.service';
import { User } from '../../../Models/User';
import { PopUpComponent } from "../../PopUp/pop-up/pop-up.component";
import { TextToIconPipe } from "../../../Pipes/textToIcon/text-to-icon.pipe";
import { MatListModule } from '@angular/material/list';
import { Lesson } from '../../../Models/Lesson';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lonly-course-form',
  standalone: true,
  imports: [PopUpComponent, TextToIconPipe,MatListModule],
  templateUrl: './lonly-course-form.component.html',
  styleUrl: './lonly-course-form.component.css'
})
export class LonlyCourseFormComponent {
  user:User | null = null;
  textToShow='האם אתה בטוח שברצונך למחוק שיעור זה'
  lessons:Lesson[]=[]
  idCourse:string=""
constructor(public lessonServe:LessonServiceService, public userServe:UserService,public route:ActivatedRoute) {
  this.route.params.subscribe(params => {
    this.idCourse = params['id']; // שליפת הערך מהפרמטר
  });
}
ngOnInit() {
  
  // מאזינים לשינויים במשתמש
  this.userServe.user$.subscribe(user => {
    this.user = user;
  });
  this.lessonServe.getLessonsByCourseId(this.idCourse).pipe(tap(lessons => {//add dynamic path
    this.lessons= lessons;
  })).subscribe();
}
  showPopUp=false
  LessonPopUp:number=0;
  
 ToPopUp(id:number)
 {
   this.showPopUp=true;
   this.LessonPopUp=id;   
 }
  closePopUp()
  {
    this.showPopUp=false;
  }
  deleteLesson()
  {
    this.showPopUp=false;
    this.lessonServe.deleteLesson(this.idCourse,this.LessonPopUp.toString());
  }
}

