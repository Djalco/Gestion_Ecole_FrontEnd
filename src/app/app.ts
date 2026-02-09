import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddClassComponent } from "./pages/crud/Classes/add-class-component/add-class-component";
import { DisplayClassComponent } from "./pages/crud/Classes/display-class-component/display-class-component";
import { AddSubjectComponent } from "./pages/crud/Subject/add-subject-component/add-subject-component";
import { DisplaySubjectComponent } from "./pages/crud/Subject/display-subject-component/display-subject-component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AddClassComponent, DisplayClassComponent, DisplaySubjectComponent, AddSubjectComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('FrontEnd');
}
