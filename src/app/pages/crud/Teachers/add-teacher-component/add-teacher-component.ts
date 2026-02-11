import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TeacherService } from '../../../../services/teacher.service';
import { Router } from '@angular/router';
import { TeacherDTO } from '../../../../models/teacher.model';
import { ClassDTO } from '../../../../models/class.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { SubjectService } from '../../../../services/subject.service';
import { SubjectDTO } from '../../../../models/subject.model';

@Component({
  selector: 'app-add-Teacher-component',
  standalone: true, // Toujours bon de le préciser explicitement
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-Teacher-component.html',
  styleUrl: './add-Teacher-component.css',
})
export class AddTeacherComponent implements OnInit {
  private TeacherService = inject(TeacherService);
  private subjectService = inject(SubjectService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  subjects: SubjectDTO[] = [];
  teacherForm!: FormGroup;
  isLoading = false;
  isSubjectsLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.initializeForm();
    this.loadSubjects();
  }

  initializeForm(): void {
    this.teacherForm = this.fb.group({
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9+ ]{8,}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      subjectId: ['', Validators.required]
    });
  }

  loadSubjects(): void {
    this.isSubjectsLoading = true;
    this.subjectService.getSubjects().pipe(
      finalize(() => this.isSubjectsLoading = false)
    ).subscribe({
      next: (data) => this.subjects = data,
      error: (err) => {
        console.error('Erreur lors de la récupération des matieres:', err);
        this.errorMessage = 'Impossible de charger les matieres.';
      }
    });
  }

  onSubmit(): void {
    if (this.teacherForm.invalid) {
      // Marquer tous les champs comme touchés pour afficher les erreurs CSS
      this.teacherForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // On récupère les valeurs et on les nettoie
    const formValue = this.teacherForm.value;
    const newTeacher: TeacherDTO = {
      ...formValue,
      firstName: formValue.firstName.trim(),
      lastName: formValue.lastName.trim(),
      email: formValue.email.trim(),
    };

    console.log("Payload à envoyer :", newTeacher);

    this.TeacherService.createTeacher(newTeacher).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (response) => {
        console.log("Étudiant créé avec succès :", response);
        // On attend un peu pour laisser l'utilisateur voir le succès ou on navigue direct
        this.router.navigate(['/teachers']);
      },
      error: (error) => {
        console.error('Error creating Teacher:', error);
        this.errorMessage = 'Erreur lors de la création de l\'étudiant. Vérifiez les données.';
      }
    });
  }
}