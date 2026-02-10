import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { Router } from '@angular/router';
import { StudentDTO } from '../../../../models/student.model';
import { ClassDTO } from '../../../../models/class.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClassService } from '../../../../services/class.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-student-component',
  standalone: true, // Toujours bon de le préciser explicitement
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student-component.html',
  styleUrl: './add-student-component.css',
})
export class AddStudentComponent implements OnInit {
  private studentService = inject(StudentService);
  private classeService = inject(ClassService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  classes: ClassDTO[] = [];
  studentForm!: FormGroup;
  isLoading = false;
  isClassesLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.initializeForm();
    this.loadClasses();
  }

  initializeForm(): void {
    this.studentForm = this.fb.group({
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9+ ]{8,}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthDate: ['', Validators.required],
      classId: ['', Validators.required]
    });
  }

  loadClasses(): void {
    this.isClassesLoading = true;
    this.classeService.getClasses().pipe(
      finalize(() => this.isClassesLoading = false)
    ).subscribe({
      next: (data) => this.classes = data,
      error: (err) => {
        console.error('Erreur lors de la récupération des classes:', err);
        this.errorMessage = 'Impossible de charger les classes.';
      }
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      // Marquer tous les champs comme touchés pour afficher les erreurs CSS
      this.studentForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // On récupère les valeurs et on les nettoie
    const formValue = this.studentForm.value;
    const newStudent: StudentDTO = {
      ...formValue,
      firstName: formValue.firstName.trim(),
      lastName: formValue.lastName.trim(),
      email: formValue.email.trim(),
    };

    console.log("Payload à envoyer :", newStudent);

    this.studentService.createStudent(newStudent).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (response) => {
        console.log("Étudiant créé avec succès :", response);
        // On attend un peu pour laisser l'utilisateur voir le succès ou on navigue direct
        this.router.navigate(['/students']);
      },
      error: (error) => {
        console.error('Error creating student:', error);
        this.errorMessage = 'Erreur lors de la création de l\'étudiant. Vérifiez les données.';
      }
    });
  }
}