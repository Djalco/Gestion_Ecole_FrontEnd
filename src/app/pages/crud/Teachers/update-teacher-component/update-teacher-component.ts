import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../../services/teacher.service'; // Ajuste tes chemins
import { SubjectService } from '../../../../services/subject.service';
import { SubjectDTO } from '../../../../models/subject.model';

@Component({
  selector: 'app-update-Teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-teacher-component.html',
  styleUrl: './update-teacher-component.css',
})
export class UpdateTeacherComponent implements OnInit {
  // --- Injections ---
  private fb = inject(FormBuilder);
  private teacherService = inject(TeacherService);
  private SubjectService = inject(SubjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // --- Propriétés ---
  teacherForm!: FormGroup;
  subjects: SubjectDTO[] = [];
  isLoading = false;
  teacherId!: number;

  constructor() {
    this.initForm();
  }

  ngOnInit(): void {
    this.teacherId = this.route.snapshot.params['id'];
    this.loadData();
  }

  private initForm() {
    this.teacherForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      password: [''], // Optionnel lors de la modif
      subjectId: ['', [Validators.required]]
    });
  }

  private loadData() {
    // 1. Charger les Subjectes
    this.SubjectService.getSubjects().subscribe(data => this.subjects = data);

    // 2. Charger l'étudiant
    if (this.teacherId) {
      this.teacherService.getTeacherById(this.teacherId).subscribe(Teacher => {
        this.teacherForm.patchValue(Teacher);
      });
    }
  }

  onSubmit() {
    if (this.teacherForm.valid) {
      this.isLoading = true;
      this.teacherService.updateTeacher(this.teacherId, this.teacherForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/teachers']);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Erreur lors de la modif', err);
        }
      });
    }
  }
}