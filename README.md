# Todo List API

![Build Status](https://github.com/ronketer/todo-list-api/actions/workflows/node.js.yml/badge.svg)

A RESTful API for managing todo lists with user authentication and CRUD operations. This project demonstrates backend development skills and quality assurance practices through comprehensive testing and CI/CD automation.

Implementation of the [Todo List API project](https://roadmap.sh/projects/todo-list-api) from [roadmap.sh](https://roadmap.sh).

---

## Features

**Backend Capabilities:**
- User authentication (register and login)
- JWT-based authentication
- CRUD operations for todos
- Pagination support
- Input validation and error handling
- Secure headers with Helmet
- XSS attack protection with xss-clean

**Quality Assurance:**
- Comprehensive test suite with Jest & Supertest
- Integration testing with MongoDB Memory Server
- Automated CI/CD pipeline with GitHub Actions
- Input validation testing (edge cases, boundaries, security)

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

## Testing & Quality Assurance

This project includes a comprehensive test suite to ensure code quality and prevent regressions.

### Running Tests Locally

**Run all tests:**
```bash
npm test
```

**Run tests in watch mode (re-run on file changes):**
```bash
npm test -- --watch
```

**Run tests with coverage report:**
```bash
npm test -- --coverage
```

**Run a specific test file:**
```bash
npm test -- tests/auth.test.js
```

### Running Tests

**Run all tests:**
```bash
npm test
```

**Run tests in watch mode:**
```bash
npm test -- --watch
```

**Run tests with coverage report:**
```bash
npm test -- --coverage
```

**Run specific test file:**
```bash
npm test -- tests/validation.test.js
```

### Test Organization

```
tests/
├── auth.test.js          # Authentication endpoint tests
├── todo.test.js          # Todo CRUD operations tests
├── validation.test.js    # Input validation edge cases
├── test-utils.js         # Shared test utilities
└── setup.js              # Jest configuration
```

### Testing Approach

This project demonstrates QA skills through comprehensive testing coverage:

| Test Category | What's Tested | Examples |
|:-------------|:-------------|:---------|
| **Happy Path** | Valid user flows | Registration, login, CRUD operations |
| **Input Validation** | Edge cases & boundaries | Empty strings, whitespace, length limits (3-50 chars) |
| **Authorization** | Access control | Protected routes, user ownership |
| **Error Handling** | Proper HTTP responses | 400 Bad Request, 404 Not Found, 401 Unauthorized |
| **Security** | Attack prevention | XSS payloads, invalid tokens |

**Testing methodologies:**
- Integration testing with real database (MongoDB Memory Server)
- Boundary testing for schema constraints
- Error path validation
- API contract verification
automated testing:

- Runs full test suite on every push
- Tests on Node.js 18.x and 20.x
- Provides visual build status (see badge above)
- Catches regressions before deployment

View test results in the [Actions tab](https://github.com/ronketer/todo-list-api/actions).

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

See `.env.example` for all required configuration options.

**Database:**

Uses MongoDB for data persistence. Schema validation enforces:
- Title length (3-50 characters)
- Required fields (title, createdBy)
- Automatic timestamps

**Security Features:**
- Password hashing with bcrypt
- JWT token authentication
- HTTP security headers (Helmet)
- XSS sanitization
- `GET /api/v1/todos/:id` - Get a single todo by ID 
- `PUT /api/v1/todos/:id` - Update a todo by ID 
- `DELETE /api/v1/todos/:id` - Delete a todo by ID 

