# TODO AnalogJS (Angular)

With the evolution of the internet and its various tools, I often find myself learning much easier with a hands-on approach, gradually increasing the difficulty with chunks of functionality and complexity.

Despite the simplicity of a todo app, it is a great first project to implement:

- **Simple well-known interface**: Common UX.
- **Basic UI components** Powered with CSS framework: TailwindCSS.
- **Simple navigation**: List page and Edit page.
- **CRUD operations**: Create, read, update, delete.
- **API response handling**: Success and error.
- **ORM**: using Prisma to abstract database interactions.
- **Continuous Integration (CI)**: Utilizes GitHub Actions to automate the testing and deployment pipeline.
- **End-to-end and Component tests**: combining Cypress and Vitest.

![Angular](https://img.shields.io/badge/-Angular-DD0031?style=flat-square&logo=angular) ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css) ![Vitest](https://img.shields.io/badge/-Vitest-4FC08D?style=flat-square&logo=vitest) ![Cypress](https://img.shields.io/badge/-Cypress-17202C?style=flat-square&logo=cypress) ![Prisma](https://img.shields.io/badge/-Prisma-3982CE?style=flat-square&logo=prisma) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript) ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite)

## Other Implementations

- [React + Next](https://github.com/elvisvidal/todo-nextjs)
- [Vue + Nuxt](https://github.com/elvisvidal/todo-nuxtjs)

---

## Analog App

This project was generated with [Analog](https://analogjs.org), the fullstack meta-framework for Angular.

## 🛠 Setup

Run `npm install` to install the application dependencies.

Configure your `.env` file according to the provided `.env.example` to set up your database.

## 💽 Database Migrations

Execute `npx prisma migrate dev` to apply database migrations.

## 🚀 Development

Run `npm start` for a dev server. Navigate to `http://localhost:5173/`. The application automatically reloads if you change any of the source files.

## 🏗 Build

Run `npm run build` to build the client/server project. The client build artifacts are located in the `dist/analog/public` directory. The server for the API build artifacts is located in the `dist/analog/server` directory.

## 🧪 Test

Run `npm run test` to execute unit tests with [Vitest](https://vitest.dev).

---
