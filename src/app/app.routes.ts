import { Routes } from '@angular/router';
import { AddClassComponent } from './pages/crud/Classes/add-class-component/add-class-component';
import { AddSubjectComponent } from './pages/crud/Subject/add-subject-component/add-subject-component';
import { DisplayStudentComponent } from './pages/crud/student/display-student-component/display-student-component';
import { AddStudentComponent } from './pages/crud/student/add-student-component/add-student-component';

export const routes: Routes = [
    {path: '', redirectTo: '/classes', pathMatch: 'full' },

    {path: 'classes', component : AddClassComponent },

    {path: 'subjects', component : AddSubjectComponent },

    {path: 'add-students', component : AddStudentComponent},
    {path : 'students' , component : DisplayStudentComponent},


];
