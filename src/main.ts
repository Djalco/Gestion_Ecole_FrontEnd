import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { AddClassComponent } from './app/pages/crud/Classes/add-class-component/add-class-component';

bootstrapApplication(AddClassComponent, appConfig).catch((err) => console.error(err));
