import { Component, OnInit } from '@angular/core';
import { CoursesServiceService } from '../../../Service/Courses/courses-service.service';
import { AsyncPipe } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { TextToIconPipe } from '../../../Pipes/textToIcon/text-to-icon.pipe';
import { UserService } from '../../../Service/User/user.service';
import { User } from '../../../Models/User';
import { Course } from '../../../Models/Course';
import { EditCourseComponent } from "../../EditCourse/edit-course/edit-course.component";
import { Lesson } from '../../../Models/Lesson';
import { LessonServiceService } from '../../../Service/Lesson/lesson-service.service';
import { PopUpComponent } from "../../PopUp/pop-up/pop-up.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AsyncPipe, MatListModule, TextToIconPipe, EditCourseComponent, PopUpComponent,RouterModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  edit:boolean=false;
  user: User | null = null;
  Course?:Course;
  Lesson?:Lesson[];
   i:number=0
   MyCourses:Course[]=[]

constructor( public apiCourse:CoursesServiceService,public userService:UserService
  ,public lessonServ:LessonServiceService,private userSite:UserService,private router:Router){}
ngOnInit() {
  // מאזינים לשינויים במשתמש
  this.userService.user$.subscribe(user => {
    this.user = user;
  });
  this.userSite.user$.subscribe(u=>{ 
    this.i= (u?.userId||0)
     this.GetMyCourses()})

}
GetMyCourses()
{
  this.apiCourse.getCoursesByUserId(this.i).subscribe(c=>this.MyCourses=c)
}
HasMyCourse(id:number)
{
 return this.MyCourses?.find((c: Course) => c.id === id)!=null
}
addCourse(course:Course)
{
  this.edit=true
this.Course=course
 }
 showPopUp=false
 coursePopUp:number=0;
 textShow=" "
 funcPopup:()=>void = () => {}
 ToPopUp(id:number,s:string,b:number)
 {
   this.showPopUp=true;
   this.coursePopUp=id;
   this.textShow=s
   if(b==1)
   {
    this.funcPopup=this.deleteCourse
   }
   else if(b==2){
    this.funcPopup=this.joinToCourse
   }
   else
   {
    this.funcPopup=this.leaveCourse
   }
 }
  closePopUp()
  {
    this.showPopUp=false;
  }
  deleteCourse()
  {
    this.showPopUp=false;
    this.apiCourse.deleteCourse(this.coursePopUp.toString());
  }
  joinToCourse() {
    this.showPopUp = false;
    this.apiCourse.enrollStudent(this.coursePopUp, this.i).subscribe(
        res => {
            console.log(res + " the res from server");
            
                alert('יופי שהצטרפת');
                // Optionally, you can update the UI to reflect the enrollment
                this.toHome()
        },
        error => {
            console.error('Enrollment error:', error);
            alert("הינך רשום כבר לקורס זה");
        }
    );
}

leaveCourse() {
    this.showPopUp = false;
    this.apiCourse.unEnrollStudent(this.coursePopUp, this.i).subscribe(
        res => {
            // Assuming 200 is the success status for leaving a course
                alert('עזבת וחבל');
                // Optionally, you can update the UI to reflect the un-enrollment
                this.toHome()
                
        },
        error => {
            console.error('Unenrollment error:', error);
            alert("עזיבת הקורס נכשלה, שגיאה: " + "אינך רשום לקורס זה");
        }
    );
}
toHome()
{
  this.router.navigate(['/home']);
}
}
