# Opis AI - Backend

Backend API for Opis AI — an AI-powered product description generator.  
Built with Node.js, Express, MongoDB, and JWT authentication. Supports daily usage limits based on user subscription plans.

> 🖥️ [Live Frontend Demo](https://denchal.github.io)

---

## Features

- **User authentication** with JWT (sign up / login)
- **Plan-based quotas** (daily limits based on user's subscription: free / pro / unlimited)
- **Product description generation** (using AI models)
- **Description history** saved in MongoDB
- **Secure password hashing** with bcrypt
- **Error handling** and input validation
- **Environment-based configuration** (.env)
- **RESTful API design** with clean separation of routes

---

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- bcrypt
- dotenv

---

## Project Structure

| File                    | Description                   |
|-------------------------|-------------------------------|
| `config/`           | Config files          |
| `cron/`           | Cron functions for user management          |
| `database/`           | Database connection          |
| `middlewares/`           | Auth middleware          |
| `models/`           | Database models            |
| `routes/`           |  API Routes                  |
| `src/`           | Main server files          |
| `utils/`            | Util functions            |
| `package.json`          | Dependencies           |
| `README.md`             | Documentation         |

