import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../../services/student.service'; // Ajuste tes chemins
import { ClassService } from '../../../../services/class.service';
import { ClassDTO } from '../../../../models/class.model';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-student-component.html',
  styleUrl: './update-student-component.css',
})
export class UpdateStudentComponent implements OnInit {
  // --- Injections ---
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private classService = inject(ClassService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // --- Propriétés ---
  studentForm!: FormGroup;
  classes: ClassDTO[] = [];
  isLoading = false;
  studentId!: number;

  constructor() {
    this.initForm();
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['id'];
    this.loadData();
  }

  private initForm() {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      password: [''], // Optionnel lors de la modif
      birthDate: ['', [Validators.required]],
      classId: ['', [Validators.required]]
    });
  }

  private loadData() {
    // 1. Charger les classes
    this.classService.getClasses().subscribe(data => this.classes = data);

    // 2. Charger l'étudiant
    if (this.studentId) {
      this.studentService.getStudentById(this.studentId).subscribe(student => {
        this.studentForm.patchValue(student);
      });
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.isLoading = true;
      this.studentService.updateStudent(this.studentId, this.studentForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/students']); 
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Erreur lors de la modif', err);
        }
      });
    }
  }
}