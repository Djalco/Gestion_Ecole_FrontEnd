import { Component, inject, OnInit } from '@angular/core';
import { TeacherService } from '../../../../services/teacher.service';
import { TeacherDTO } from '../../../../models/teacher.model';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ClassDTO } from '../../../../models/class.model';
import { SubjectDTO } from '../../../../models/subject.model';

@Component({
  selector: 'app-display-Teacher-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './display-Teacher-component.html',
  styleUrl: './display-Teacher-component.css',
})
export class DisplayTeacherComponent implements OnInit {



  private teacherService = inject(TeacherService);
  private router = inject(Router);


  teachers: TeacherDTO[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  selectedTeacher: TeacherDTO | null = null;
  subjects: SubjectDTO[] = [];

  ngOnInit(): void {
    this.loadTeachers();
    this.loadSubjects();
  }
  loadSubjects() {
    this.teacherService.getTeachers().subscribe({
      next: (data) => {

      },
      error: (error) => {
        console.error('Error fetching Subjects:', error);
      }
    });
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching Teachers:', error);
        this.errorMessage = 'Failed to load Teachers.';
        this.isLoading = false;
      }
    });
  }

  selectTeacher: TeacherDTO | null = null;

  editTeacher(id: number | undefined) {
    if (id) {
      this.router.navigate(["/update-teacher", id])
    }
  }
  editTeacherSelect() {
    if (this.selectTeacher?.id) {
      this.editTeacher(this.selectTeacher.id)
    }
  }
  deleteTeacher(id: number | undefined) {

    if (confirm('Are you sure you want to delete this Teacher?')) {

      if (id) {
        this.teacherService.deleteTeacher(id).subscribe({
          next: () => {
            console.log('Subject deleted successfully');
            this.loadTeachers(); // Refresh the list after deletion
          },
          error: (error) => {
            console.error('Error deleting subject:', error);
          }
        });
      }

    }
  }
}
