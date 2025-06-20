
# 🧠 Goal Tracker – Backend

This is the backend service for the Goal Tracker full-stack application, built with **NestJS** and **Prisma**. It provides RESTful endpoints for user authentication, goal management, and public goal viewing.

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v20.19.0)
- npm or yarn
- PostgreSQL or SQLite (see below)
- [Prisma CLI](https://www.prisma.io/docs/getting-started/quickstart) (`npm install -g prisma`)

### Installation

```bash
npm install
````

### Database Setup

1. Create your `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/goal_tracker"
JWT_SECRET="my_super_secret_key"

2. Run Prisma migrations:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

3. Start the server:

```bash
npm run start:dev
```

The API will be running at:
👉 `http://localhost:3000`

---

## 🧱 Tech Stack Summary

* **NestJS** – Backend framework
* **Prisma** – ORM for database access
* **JWT** – Authentication
* **PostgreSQL** – Database
* **UUID** – Unique identifiers for public goals

---

## 🔑 Key Features

* ✅ JWT-based authentication
* ✅ Register / Login endpoints
* ✅ CRUD operations on personal goals
* ✅ Goal nesting up to 2 levels
* ✅ View public goals (with shareable `publicId`)
* ✅ Role-based access (only owner can edit/delete)

---

## ⚖️ Key Decisions & Trade-Offs

* 🧩 **Prisma** was chosen for strong TypeScript integration and ease of schema migrations
* 🔐 **JWT** provides stateless and secure user sessions
* 📦 **postgresql** is used by default for ease of local development; PostgreSQL supported for production

---

## ⚠️ Known Limitations

* 🛠 No role management beyond ownership checks
* 📤 Drag-and-drop reordering logic not implemented
* 🧪 No automated tests yet

---
