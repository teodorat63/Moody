# Moody Backend 🧠💬

This is the backend for **Moody**, an intelligent app that generates personalized playlists based on your current mood.  Built with **NestJS**, **PostgreSQL**, and **Prisma ORM**, it features robust authentication with **JWT**, organized modular architecture, and a fully dockerized dev environment.

> 🚀 This backend is intended to be used **together with the [Moody Frontend](https://github.com/teodorat63/moody-f)**, which provides the user-facing experience.
---
## 🧠 What It Does

- 🎧 **Generates playlists** tailored to how you're feeling
- 😊 Tracks user moods over time
- 🛡️ Provides secure user registration & login
- 🧱 Modular and scalable backend architecture
- 🐳 Fully dockerized environment

---
## 🏗️ Tech Stack

- **[NestJS](https://nestjs.com/)** – Progressive Node.js framework
- **[Prisma](https://www.prisma.io/)** – Modern ORM for PostgreSQL
- **[PostgreSQL](https://www.postgresql.org/)** – Relational database
- **[Docker](https://www.docker.com/)** – Containerized environment
- **[Passport.js](http://www.passportjs.org/)** – Authentication middleware
- **JWT (JSON Web Tokens)** – Secure token-based auth
- **Argon2** – Secure password hashing

---

## 🔧 Features

- User authentication: **sign up**, **sign in**, **JWT tokens**
- Secure password hashing with **argon2**
- Modular NestJS architecture with **Dependency Injection**
- **Guards** and **Custom Decorators** for protected routes
- Integrated with **Prisma** ORM
- Dockerized **PostgreSQL** database
- Auto-run **migrations** on container start
- Clean and extendable codebase

