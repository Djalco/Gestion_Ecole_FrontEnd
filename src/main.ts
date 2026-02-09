import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { AddClassComponent } from './app/pages/crud/Classes/add-class-component/add-class-component';
import { DisplayClassComponent } from './app/pages/crud/Classes/display-class-component/display-class-component';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
