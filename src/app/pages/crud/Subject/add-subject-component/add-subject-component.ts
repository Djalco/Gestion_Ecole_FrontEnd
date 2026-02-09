import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectService } from '../../../../services/subject.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectDTO } from '../../../../models/subject.model';

@Component({
  selector: 'app-add-Subject-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-subject-component.html',
  styleUrls: ['./add-subject-component.css'],
})
export class AddSubjectComponent implements OnInit {

  private subjectService = inject(SubjectService);
  private router = inject(Router);

  subject: SubjectDTO[] = [];
  subjectForm!: FormGroup;
  private fb = inject(FormBuilder);
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.initializeForm();
    //this.loadSubjectes();

  }

 
  initializeForm() {
    this.subjectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      coefficient: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    
    if (this.subjectForm.invalid) {
      return;
    } 

    this.isLoading = true;
    const v = this.subjectForm.value;

    const newSubject = {
      name: v.name,
      coefficient: v.coefficient
    };
    this.subjectService.createSubject(newSubject).subscribe({
      next: (response) => {
        console.log('Subject created successfully:', response);
        this.router.navigate(['/subjects']);
      }
      , error: (error) => {
        console.error('Error creating Subject:', error);
        this.errorMessage = 'Failed to create Subject. Please try again.';
        this.isLoading = false;
      }
    });
  }

}
