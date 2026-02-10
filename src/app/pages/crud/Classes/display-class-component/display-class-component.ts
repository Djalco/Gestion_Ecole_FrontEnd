import { Component, inject, OnInit } from '@angular/core';
import { ClassService } from '../../../../services/class.service';
import { ClassDTO } from '../../../../models/class.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-class-component',
  imports: [CommonModule],
  templateUrl: './display-class-component.html',
  styleUrl: './display-class-component.css',
})
export class DisplayClassComponent implements OnInit {

  private classService = inject(ClassService);
  classes: ClassDTO[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadClasses();

  }

  loadClasses() {
    this.classService.getClasses().subscribe({
      next: (data) => {
        console.log('Données reçues de l’API :', data); // <--- REGARDE CECI DANS LA CONSOLE
        this.classes = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur API :', error);
      }
    });
  }
}
