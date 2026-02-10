import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { StudentDTO } from '../../../../models/student.model';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ClassDTO } from '../../../../models/class.model';

@Component({
  selector: 'app-display-student-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './display-student-component.html',
  styleUrl: './display-student-component.css',
})
export class DisplayStudentComponent implements OnInit {



  private studentService = inject(StudentService);
  

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

  editStudent(student: StudentDTO) {
    this.selectedStudent = student;
    if (this.selectedStudent?.id) {
      // Navigate to the edit page for the selected student 
    }
  }
  deleteStudent(student: StudentDTO) {
    this.selectedStudent = student;
    if (confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
      if (this.selectedStudent?.id) {
        this.studentService.deleteStudent(this.selectedStudent.id).subscribe({
          next: () => {
            this.loadStudents();
            alert('Student deleted successfully');
          },
          error: (error) => {
            console.error('Error deleting student:', error);
          }
        });
      }
    }
  }
 
}
