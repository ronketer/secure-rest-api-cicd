# Todo List API

This project provides a simple API for managing a todo list, including user authentication and CRUD operations for todos. It is an implementation of the [Todo List API project](https://roadmap.sh/projects/todo-list-api) from [roadmap.sh](https://roadmap.sh).

## Features

- User authentication (register and login)
- JWT-based authentication
- CRUD operations for todos
- Pagination support
- Secure headers with Helmet
- Protection against XSS attacks with xss-clean


## Running the project

1. Clone the repository

2. Install dependencies with npm install

3. Create a `.env` file and add the environment variables:

   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRATION=30d

4. Start the server with npm start


## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Log in with existing user credentials

### Todos

- `GET /api/v1/todos` - Get a list of todos
- `POST /api/v1/todos` - Create a new todo
- `GET /api/v1/todos/:id` - Get a single todo by ID 
- `PUT /api/v1/todos/:id` - Update a todo by ID 
- `DELETE /api/v1/todos/:id` - Delete a todo by ID 

