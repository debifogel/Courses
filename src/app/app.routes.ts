import { Routes } from '@angular/router';
import { CoursesComponent } from '../Components/Courses/courses/courses.component';
import { HomeComponent } from '../Components/Home/home/home.component';
import { LonlyCourseFormComponent } from '../Components/LonlyCourseForm/lonly-course-form/lonly-course-form.component';


export const routes: Routes = [
    {path:"home",component:HomeComponent },
    {path:"the_courses", component: CoursesComponent ,
       },
    
    { path: 'course/:id', component: LonlyCourseFormComponent }
    
];
