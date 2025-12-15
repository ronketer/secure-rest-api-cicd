# Todo List API

![Build Status](https://github.com/ronketer/todo-list-api/actions/workflows/node.js.yml/badge.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen)
![License](https://img.shields.io/badge/license-ISC-blue)

A production-ready RESTful API for managing todo lists with user authentication, CRUD operations, comprehensive validation, and automated testing. Demonstrates full-stack backend development—from secure authentication and data persistence to robust error handling and quality assurance.

Implementation of the [Todo List API project](https://roadmap.sh/projects/todo-list-api) from [roadmap.sh](https://roadmap.sh).

---

## Features

**Backend Development:**
- JWT-based user authentication (register, login, password hashing with bcryptjs)
- Full CRUD operations for todo items
- Pagination and filtering support
- Schema-level validation with Mongoose
- Comprehensive input validation & error handling
- Security headers (Helmet), XSS protection
- Async error handling with express-async-errors
- Custom error classes for consistent API responses

**Quality & Testing:**
- Integration testing with Jest & Supertest
- Real MongoDB testing via MongoDB Memory Server
- Input validation testing (boundaries, edge cases, security payloads)
- Automated CI/CD pipeline (GitHub Actions)
- 90%+ code coverage
- Test-driven validation ensures API reliability

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Testing:** Jest, Supertest, MongoDB Memory Server
- **Security:** JWT, bcryptjs, Helmet, xss-clean
- **CI/CD:** GitHub Actions

---

## Quick Start

**1. Clone the repository**
```bash
git clone https://github.com/ronketer/todo-list-api.git
cd todo-list-api
```

**2. Install dependencies**
```bash
npm install
```

**3. Create a `.env` file** (see `.env.example` for reference)
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=30d
```

**4. Start the server**
```bash
npm start
```

The API will be available at `http://localhost:3000`

---

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login with credentials

### Todos
- `GET /api/v1/todos` - Get paginated list of todos
- `POST /api/v1/todos` - Create a new todo
- `GET /api/v1/todos/:id` - Get a specific todo
- `PUT /api/v1/todos/:id` - Update a todo
- `DELETE /api/v1/todos/:id` - Delete a todo

---

## Testing & Code Quality

This project demonstrates a **professional QA mindset**—not just writing tests, but ensuring API reliability through boundary testing, security validation, and error handling verification.

### Running Tests

```bash
npm test                        # Run all tests
npm test -- --coverage         # Generate coverage report
npm test -- --watch            # Watch mode (re-run on changes)
npm test -- tests/auth.test.js # Run specific suite
```

### Test Organization

```
tests/
├── auth.test.js          # Authentication & input validation
├── todo.test.js          # CRUD operations, error handling
├── validation.test.js    # Edge cases, boundary testing
├── setup.js              # Jest & MongoDB Memory Server config
└── test-utils.js         # Shared utilities
```

### Test Coverage

| Category | What's Tested | Examples |
|:---------|:-------------|:---------|
| **Authentication** | Register/login flows, JWT validation | Valid credentials, missing fields, token expiry |
| **CRUD Operations** | Todo creation, retrieval, updates, deletion | Success paths, non-existent resources, unauthorized access |
| **Input Validation** | Boundary testing, edge cases | Empty strings, length limits (3-50 chars), whitespace |
| **Error Handling** | HTTP response codes, error messages | 400 Bad Request, 401 Unauthorized, 404 Not Found |
| **Security** | Injection attacks, malformed payloads | XSS attempts, invalid JSON, special characters |

### CI/CD Pipeline

Automated testing on every push:
- Runs against Node.js 18.x and 20.x
- Full test suite executes automatically
- Build status visible in [Actions tab](https://github.com/ronketer/todo-list-api/actions)

---

## Project Structure

```
todo-list-api/
├── controllers/       # Business logic for routes
├── models/           # MongoDB schemas (User, Todo)
├── routes/           # API endpoint definitions
├── middleware/       # Authentication, error handling
├── errors/           # Custom error classes
├── tests/            # Test suite
├── .github/          # CI/CD workflows
└── app.js            # Express app configuration
```

---

## Development

**Environment Variables:**

```env
PORT=3000                              # Server port
MONGO_URI=mongodb://localhost/todo-api # MongoDB connection
JWT_SECRET=your_secret_key             # JWT signing key
JWT_EXPIRATION=30d                     # Token expiration time
NODE_ENV=development                   # Environment
```

**Key Implementation Details:**

- **Authentication:** Bcrypt password hashing, JWT tokens with expiration
- **Validation:** Mongoose schema constraints + application-level validation
- **Error Handling:** Custom error classes, async error wrapper middleware
- **Database:** MongoDB with auto-incrementing IDs and timestamps
- **Security:** Helmet, XSS sanitization, CORS headers (configurable)

**Security Features:**
- Password hashing with bcrypt
- JWT token authentication
- HTTP security headers (Helmet)
- XSS sanitization
- `GET /api/v1/todos/:id` - Get a single todo by ID 
- `PUT /api/v1/todos/:id` - Update a todo by ID 
- `DELETE /api/v1/todos/:id` - Delete a todo by ID 

