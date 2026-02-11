import { Routes } from '@angular/router';
import { AddClassComponent } from './pages/crud/Classes/add-class-component/add-class-component';
import { AddSubjectComponent } from './pages/crud/Subject/add-subject-component/add-subject-component';
import { DisplayStudentComponent } from './pages/crud/student/display-student-component/display-student-component';
import { AddStudentComponent } from './pages/crud/student/add-student-component/add-student-component';
import { UpdateSubjectComponent } from './pages/crud/Subject/update-subject-component/update-subject-component';
import { UpdateClassComponent } from './pages/crud/Classes/update-class-component/update-class-component';
import { UpdateStudentComponent } from './pages/crud/student/update-student-component/update-student-component';

export const routes: Routes = [
    { path: '', redirectTo: '/classes', pathMatch: 'full' },

    { path: 'classes', component: AddClassComponent },
    { path: 'update-classe/:id', component: UpdateClassComponent },

    { path: 'subjects', component: AddSubjectComponent },
    { path: 'update-subjects/:id', component: UpdateSubjectComponent },

    { path: 'add-students', component: AddStudentComponent },
    { path: 'students', component: DisplayStudentComponent },
    { path: 'update-student/:id', component: UpdateStudentComponent }


];
