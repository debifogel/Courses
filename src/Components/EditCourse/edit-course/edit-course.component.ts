import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../../../Models/Course';
import { Lesson } from '../../../Models/Lesson';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { CoursesServiceService } from '../../../Service/Courses/courses-service.service';
import { LessonServiceService } from '../../../Service/Lesson/lesson-service.service';
import { UserService } from '../../../Service/User/user.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,MatGridListModule
  ],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent implements OnInit {
  lessonForm: FormGroup;
  idTeacher:number|undefined
  @Input() course?: Course; // Input for existing course
   lessons?: Lesson[]; // Input for existing lessons

  constructor(private fb: FormBuilder,private courseServe:CoursesServiceService,private lessonServe:LessonServiceService,private myUser:UserService) {
    this.lessonForm = this.fb.group({
      courseTitle: ['', Validators.required],
      courseDescription: ['', Validators.required],
      lessons: this.fb.array([])
    });
  }

  ngOnInit() {
    if (this.course) {
      this.lessonForm.patchValue({
        courseTitle: this.course.title,
        courseDescription: this.course.description
      });
      this.lessonServe.getLessonsByCourseId((this.course.id||0).toString()).pipe(
        tap((lessons: Lesson[]) => {this.lessons = lessons
          if (this.lessons) {
            this.lessons.forEach(lesson => {
              this.addLessonFields(lesson);
            });
          }})
       ).subscribe();
    }

    
   this.myUser.user$.pipe(tap((u)=>{return  this.idTeacher=u?.userId})).subscribe()

  }

  get lessonsArray(): FormArray {
    return this.lessonForm.get('lessons') as FormArray;
  }

  addLessonFields(lesson?: Lesson) {
    const lessonGroup = this.fb.group({
      lessonTitle: [lesson ? lesson.title : '', Validators.required],
      lessonContent: [lesson ? lesson.content : '', Validators.required],
      courseId: [this.course ? this.course.id : null, Validators.required]
    });

    this.lessonsArray.push(lessonGroup);
  }
  onSubmit() {
    if (this.lessonForm.valid) {
      let result=this.course?.id
        const courseData: Course = {
            id: this.course ? this.course.id : null, // Use existing course ID if updating
            title: this.lessonForm.value.courseTitle,
            description: this.lessonForm.value.courseDescription,
            teacherId:this.idTeacher||0
        };
        if (this.course!=null) {
          this.courseServe.updateCourse((this.course?.id||" ").toString(), courseData);
      }else {
        // Create new course
       this.courseServe.createCourse(courseData).subscribe(res => {
         result = res;
       });
    }
        // Map the lessons from the form to Lesson instances
    this.lessonForm.value.lessons.forEach((lesson: any) => {
           { if(lesson.id) {
            this.lessonServe.updateLesson((this.course?.id||0).toString(),lesson.id.toString(), new Lesson(
                lesson.id , 
                lesson.lessonTitle,
                lesson.lessonContent,
                result||0
            ))}
            else{
              this.lessonServe.createLesson((result||0).toString(),new Lesson(
                null , 
                lesson.lessonTitle,
                lesson.lessonContent,
                result||0))
            }
          }
        });
       
        // Add the lessons to the courseData

         

        console.log('Course data submitted:', courseData);
    } else {
        console.log('Form is invalid');
    }
}

}
