# My first Angular + Firebase adventure: A matchmaking site for tiny house dwellers and landowners looking to rent out an area.

## Live site at [Tinyland.dk](http://www.tinyland.dk)

## Angular version
Started at Angular4 and then updated to Angular5.

## Database
[Cloud Firestore](https://firebase.google.com/docs/firestore/) is a flexible, scalable NoSQL cloud database to store and sync data for client- and server-side development. Currently in beta, but I took the chance!

## Authentication
I've used [Firebase Authentication](https://firebase.google.com/docs/auth/) for authenticating my users. It leverages industry standards, in this case OAuth 2.0. The user can log in via email/password, Google or Facebook.

## Layout
[Angular Flex-Layout](https://github.com/angular/flex-layout) provides HTML UI layout for Angular applications; using Flexbox and a Responsive API.
See [this StackBlitz](https://stackblitz.com/edit/angular-material-flex-layout-seed?file=app%2Fapp.module.ts) on how Angular Flex-Layout plays nicely with [Angular Material](https://material.angular.io/)

## Deployment and Hosting
[Firebase Hosting](https://firebase.google.com/docs/hosting/) provides fast and secure static hosting, and it's easy to deploy using the Firebase CLI. I've used it for properly testing my appplication outside the development environment. I haven't decided yet if I want to use it for production hosting as well. Stay tuned!


---
## Instructions from Angular: 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
