# Pokémon App - Technical Interview Exercise

## 📋 Overview

This project is a solution for the BLA technical interview exercise. It is a Pokémon application developed using **React**, **TypeScript**, **Clean Architecture**, **React Query**, and **TDD (Test-Driven Development)** methodologies.

The solution was designed to be scalable, maintainable, and testable, following software engineering best practices.

---

## 🚀 Features

### ✅ Authentication

- Login form with username/password fields.
- Local validation:
  - ✅ Username: `admin`
  - ✅ Password: `admin`
- State persisted in `localStorage`.
- Redirects based on authentication state:
  - If authenticated → redirect to main page.
  - If not → redirect to login page.

---

### ✅ Pokémon List

- Search bar with infinit scroll list of Pokémon.
- Data fetched from [PokeAPI](https://pokeapi.co/).
- Pagination handled via API `offset` and `limit`.
- Each Pokémon displayed with its **photo** and **name**.
- Data caching with **React Query**.

---

### ✅ Pokémon Detail

- On click, a **modal** displays detailed information:
  - **Abilities**
  - **Moves**
  - **Forms**

---

### ✅ Architecture

The application follows **Clean Architecture** principles:

| Layer            | Description                                                       |
| ---------------- | ----------------------------------------------------------------- |
| `Domain`         | Entities and Use Cases (e.g., user credential validation).        |
| `Application`    | Business logic: services, data formatters, and React Query hooks. |
| `Infrastructure` | API client and storage abstractions.                              |
| `Presentation`   | React components, pages, and routes with protected routes.        |
| `Shared`         | Generic helpers (e.g., string formatting).                        |

---

## 🛠️ Technologies

- ⚛️ React with TypeScript
- ⚡ Vite (build tool)
- 🔥 Zustand (global state for authentication)
- 🔗 React Query (TanStack Query) for data fetching and caching
- 🛣️ React Router for navigation and protected routes
- 🧪 Jest + React Testing Library for unit and integration tests
- 🎭 MSW (Mock Service Worker) for API mocking in tests
- 🎨 Material UI for styling

---

## ✅ Test Coverage

- **Authentication logic**: validated via TDD.
- **Pokémon list fetching**: tested with MSW-mocked API.
- **Error handling**: tested for invalid credentials.
- **UI components**: tested for rendering and interaction.

> All critical flows are covered with unit and integration tests.

---

## 🧩 Project Structure

```
src/
├── application/
│   ├── formatters/
│   ├── hooks/
│   └── services/
├── domain/
│   ├── entities/
│   └── usecases/
├── infrastructure/
│   ├── api/
│   └── storage/
├── presentation/
│   ├── components/
│   ├── pages/
│   └── routes/
├── shared/
│   └── helpers/
├── state/
├── tests/
└── main.tsx
```

---

## 🧪 Running the project

### 1. Clone the repository

```bash
git clone https://github.com/ctcruz/pokedex-challenge.git
cd pokedex-challenge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

### 4. Run tests

```bash
npm run test
```

---

## 🖥️ Deployment

The application can be deployed using **Vercel**, **Netlify**, or any static hosting supporting Vite.

---

## 🧑‍💻 How to Use

1. Open `/login`.
2. Enter:
   - Username: `admin`
   - Password: `admin`
3. Explore the Pokémon list.
4. Use search or navigate through pagination.
5. Click on a Pokémon to view its details in a modal.

---

## 📈 Performance and Best Practices

- ✅ Data caching via **React Query**.
- ✅ Local state management via **Zustand**.
- ✅ Optimized builds with **Vite**.
- ✅ Strict type safety with **TypeScript**.
- ✅ Code quality enforced with **ESLint** and **Prettier**.
- ✅ Accessible UI with **semantic HTML** and **ARIA** attributes.

---

## 🏆 Additional Features

- Modal with detailed Pokémon data.
- Input validation and error feedback.
- Protected routes based on authentication.
- Mocked API with MSW for test reliability.

---

## 💡 Future Improvements

- Implement **Dark Mode**.
- Enhance with **animations** using Framer Motion.
- Add **e2e tests** with Cypress.

---

## 🎤 Presentation Guide

During the presentation:

1. Explain the **user stories** and how they guided the development.
2. Describe the **Clean Architecture** and layering.
3. Demonstrate:
   - Login
   - Pokémon search and pagination
   - Modal with details
   - Data caching
4. Discuss testing approach with TDD.
5. Open for **code review** and questions.

---

## 📝 License

This project is provided as part of a **technical interview** and is not intended for commercial use.

---

## 🙌 Thank you!
