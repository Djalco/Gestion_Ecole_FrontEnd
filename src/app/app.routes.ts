import { Routes } from '@angular/router';
import { AddClassComponent } from './pages/crud/Classes/add-class-component/add-class-component';
import { AddSubjectComponent } from './pages/crud/Subject/add-subject-component/add-subject-component';
import { DisplayStudentComponent } from './pages/crud/student/display-student-component/display-student-component';
import { AddStudentComponent } from './pages/crud/student/add-student-component/add-student-component';
import { UpdateSubjectComponent } from './pages/crud/Subject/update-subject-component/update-subject-component';
import { UpdateClassComponent } from './pages/crud/Classes/update-class-component/update-class-component';
import { UpdateStudentComponent } from './pages/crud/student/update-student-component/update-student-component';
import { DisplayTeacherComponent } from './pages/crud/Teachers/display-teacher-component/display-teacher-component';
import { AddTeacherComponent } from './pages/crud/Teachers/add-teacher-component/add-teacher-component';
import { UpdateTeacherComponent } from './pages/crud/Teachers/update-teacher-component/update-teacher-component';

export const routes: Routes = [
    { path: '', redirectTo: '/classes', pathMatch: 'full' },

    { path: 'classes', component: AddClassComponent },
    { path: 'update-classe/:id', component: UpdateClassComponent },

    { path: 'subjects', component: AddSubjectComponent },
    { path: 'update-subjects/:id', component: UpdateSubjectComponent },

    { path: 'students', component: DisplayStudentComponent },
    { path: 'add-students', component: AddStudentComponent },
    { path: 'update-student/:id', component: UpdateStudentComponent },

    {path: 'teachers', component : DisplayTeacherComponent},
    {path: 'add-teacher', component : AddTeacherComponent},
    {path: 'update-teacher/:id', component: UpdateTeacherComponent }


];
