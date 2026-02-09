import { Routes } from '@angular/router';
import { AddClassComponent } from './pages/crud/Classes/add-class-component/add-class-component';
import { AddSubjectComponent } from './pages/crud/Subject/add-subject-component/add-subject-component';

export const routes: Routes = [
    {path: '', redirectTo: '/classes', pathMatch: 'full' },
    {path: 'classes', component : AddClassComponent },
    {path: 'subjects', component : AddSubjectComponent },


];
