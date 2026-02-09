import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassService } from '../../../../services/class.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-class-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-class-component.html',
  styleUrls: ['./add-class-component.css'],
  providers: [ClassService]
})
export class AddClassComponent implements OnInit {

  private classService = inject(ClassService);
  private router = inject(Router);

  classForm!: FormGroup;
  private fb = inject(FormBuilder);
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.initializeForm();
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
