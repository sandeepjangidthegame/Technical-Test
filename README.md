#Technical Test

This repository contains a simple React application with NodeJs for user management. It includes user login, user registration, and a user dashboard with various filters like Date, Sorting, and Department. The backend API is built using Node.js, Express.js, and MySQL database. The API uses JWT token for authentication and is documented using Swagger.

## Frontend - React App
### Features

- User Login: Users can log in to access their dashboard.
- User Registration: New users can register to create an account.
- User Dashboard: Users can view their dashboard with various filters.
- Filters: The dashboard supports filtering by Date, Sorting, and Department.

### Frontend Technologies

- React.js
- useState and useEffect (for state management)
- Bootstrap (for UI styling)
- React Router (for routing)

### How to Run the Frontend

1. Clone this repository to your local machine.
2. Navigate to the `frontend` directory.
3. Run `npm install` to install the required dependencies.
4. Run `npm start` to start the React app.
5. Open your browser and go to `http://localhost:3001` to access the app.

## Backend API - Node.js with Express.js

### Features

- User Login: Authenticate users and generate JWT tokens.
- User Registration: Allow new users to register and create an account.
- Get All Users: Retrieve all users with support for various filters.
- JWT Token: Use JWT token for secure authentication.
- Swagger Documentation: API endpoints are documented using Swagger.

### Backend Technologies

- Node.js
- Express.js
- MySQL (database)
- JWT (for authentication)
- Swagger (for API documentation)

### How to Run the Backend API

1. Clone this repository to your local machine.
2. Navigate to the `backend` directory.
3. Run `npm install` to install the required dependencies.
4. Run `npm start` to start the backend server.
5. The API will be accessible at `http://localhost:3000`.

## Database - MySQL

The backend API uses a MySQL database for data storage. The database schema is designed to support user registration and user data.

### Database Schema

- `users` table: Contains user information (id, user_name, user_email, user_passwd, dept, etc.).
