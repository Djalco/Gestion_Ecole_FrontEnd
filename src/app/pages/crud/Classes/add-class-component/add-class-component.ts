import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassService } from '../../../../services/class.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClassDTO } from '../../../../models/class.model';

@Component({
  selector: 'app-add-class-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-class-component.html',
  styleUrls: ['./add-class-component.css'],
})
export class AddClassComponent implements OnInit {

  private classService = inject(ClassService);
  private router = inject(Router);

  classes: ClassDTO[] = [];
  classForm!: FormGroup;
  private fb = inject(FormBuilder);
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.initializeForm();
    this.loadClasses();

  }

  loadClasses() {
    this.classService.getClasses().subscribe({
      next: (data) => {
        this.classes = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching classes:', error);  
      }
    });
  }
  initializeForm() {
    this.classForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.classForm.invalid) {
      return;
    }
    this.isLoading = true;
    const newClass = this.classForm.value;
    this.classService.createClass(newClass).subscribe({
      next: (response) => {
        console.log('Class created successfully:', response);
        this.router.navigate(['/classes']);
      },
      error: (error) => {
        console.error('Error creating class:', error);
        this.errorMessage = 'Failed to create class. Please try again.';
        this.isLoading = false;
      } 
    });
  }
  
}
