import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';
import { AddClassComponent } from './app/pages/crud/Classes/add-class-component/add-class-component';
import { DisplayClassComponent } from './app/pages/crud/Classes/display-class-component/display-class-component';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, config, context);

export default bootstrap;
