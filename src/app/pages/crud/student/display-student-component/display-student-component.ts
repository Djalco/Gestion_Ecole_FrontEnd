import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { StudentDTO } from '../../../../models/student.model';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ClassDTO } from '../../../../models/class.model';
import { SubjectDTO } from '../../../../models/subject.model';

@Component({
  selector: 'app-display-student-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './display-student-component.html',
  styleUrl: './display-student-component.css',
})
export class DisplayStudentComponent implements OnInit {



  private studentService = inject(StudentService);
  private router = inject(Router);
  

  students: StudentDTO[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  selectedStudent: StudentDTO | null = null;
  classes: ClassDTO[] = [];

  ngOnInit(): void {
    this.loadStudents();
    this.loadClasses();
  }
  loadClasses() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        
      },
      error: (error) => {
        console.error('Error fetching classes:', error);  
      }
    }); 
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching students:', error);
        this.errorMessage = 'Failed to load students.';
        this.isLoading = false;
      }
    });
  }

  selectStudent:  StudentDTO |null = null;

  editStudent(id: number|undefined) {
    if (id) {
      this.router.navigate(["/update-student",id])
    }
  }
  editStudentSelect(){
    if(this.selectStudent?.id){
      this.editStudent(this.selectStudent.id)
    }
  }
  deleteStudent(id: number | undefined) {

    if (confirm('Are you sure you want to delete this student?')) {

      if (id) {
        this.studentService.deleteStudent(id).subscribe({
          next: () => {
            console.log('Subject deleted successfully');
            this.loadStudents(); // Refresh the list after deletion
          },
          error: (error) => {
            console.error('Error deleting subject:', error);
          }
        });
      }

    }
  }
}
