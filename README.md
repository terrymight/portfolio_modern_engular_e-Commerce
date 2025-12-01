
# 🛍️ Modern Angular E-Commerce with NgRx & Tailwind

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![NgRx](https://img.shields.io/badge/NgRx-B900DD?style=for-the-badge&logo=ngrx&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

> **Live Demo:** [Insert Link to Vercel/Netlify Demo Here]

## 📖 Overview

This project is a fully responsive, scalable E-Commerce application built to demonstrate **advanced state management patterns** using the **NgRx** ecosystem.

Unlike simple CRUD apps, this project focuses on handling complex client-side data scenarios, including asynchronous product loading, optimistic UI updates, memoized state selection, and a fully reactive shopping cart experience. The UI is crafted with **TailwindCSS** for a utility-first, mobile-first design approach.



---

## ✨ Key Features

* **State-Driven UI:** The entire application state (Products, Cart, User) is managed via a single immutable store.
* **Product Catalog:** Dynamic product grid with loading skeletons and error handling.
* **Advanced Filtering:** Category and price filtering handled via NgRx Selectors (client-side) to minimize API calls.
* **Reactive Cart System:** * Add/Remove items with real-time total calculation.
    * Quantity adjustments are persisted in the state immediately.
* **Responsive Design:** Fully fluid layout using Tailwind grid and flexbox utilities.
* **Effects Integration:** Side effects (API calls, toaster notifications) are isolated using NgRx Effects.

---

## 🛠️ Tech Stack & Architecture

### Frontend Core
* **Framework:** Angular 16+ (Standalone Components utilized).
* **Language:** TypeScript (Strict mode enabled).
* **Styling:** TailwindCSS (configured with custom theme extensions).

### State Management (The Core)
This application utilizes the Redux pattern via the **NgRx** library.



* **Store:** Single source of truth.
* **Actions:** Strictly typed actions describing unique events (e.g., `[Cart] Add Item`, `[Product API] Load Success`).
* **Reducers:** Pure functions handling state transitions.
* **Selectors:** Memoized functions to derive data (e.g., `selectCartTotal`, `selectVisibleProducts`).
* **Effects:** Handles asynchronous operations (HTTP requests) and isolates side effects from components.

### Folder Structure
I structured the application by **Feature Modules** to ensure scalability:

```text
src/app/
├── core/                   # Singleton services, guards, interceptors
├── shared/                 # Reusable UI components (Buttons, Cards)
├── Model/                  # Interface definition
├── service/                # The Service
├── store/                  # The Global App State
│   ├── user/               # Actions, Reducers, Selectors
│   └── products/           # Product Actions, Reducers, Effects
├── features/
│   ├── product-list/       # Smart/Dumb component architecture
│   ├── cart-view/
│   └── checkout/
|   └── feature.routes.ts
└── app.component.ts

# NgrxStore

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
