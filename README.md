# Full-Stack Blog Application

A complete full-stack blogging platform built with **React**, **Node.js**, **Express**, and **MySQL**. This application features user authentication, blog creation, viewing blog details, and a commenting system.

## Features

- **Authentication**: Secure user registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.
- **Blog Management**: Users can create new blog posts and view a list of all existing posts.
- **Detailed View**: View individual blog posts with full content.
- **Comments**: Interactive commenting system for each blog post.
- **Modern UI**: Styled with custom CSS for a clean, responsive user experience.

## Technologies Used

### Frontend
- **React 19**: Modern UI library.
- **Vite**: Ultra-fast build tool and dev server.
- **React Router Dom**: Client-side routing.
- **Axios**: HTTP client for API requests.
- **Vanilla CSS**: Custom styling for a unique look.

### Backend
- **Node.js**: JavaScript runtime.
- **Express**: Fast, unopinionated web framework.
- **MySQL**: Relational database for storing users, posts, and comments.
- **JWT**: Secure token-based authentication.
- **Bcrypt.js**: Industry-standard password hashing.

## Prerequisites

- **Node.js**: Version 18 or higher.
- **MySQL**: Installed and running locally.
- **npm**: Package manager.

##  Installation & Setup

### 1. Database Setup
Create a MySQL database and update the connection details in `backend/db.js`.

### 2. Backend Setup
```bash
cd backend
npm install
node server.js
```
The backend server will run on `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend application will run on `http://localhost:5173`.

## 📁 Project Structure

```
Ass9/
├── backend/
│   ├── routes/         # API endpoints (Auth, Posts)
│   ├── middleware/     # Auth middleware
│   ├── db.js          # Database connection
│   └── server.js       # Main server file
├── frontend/
│   ├── src/
│   │   ├── pages/      # Page components (BlogHome, Login, etc.)
│   │   ├── App.jsx     # Main App component & Routing
│   │   ├── main.jsx    # Entry point
│   │   └── styles.css  # Global styles
│   └── index.html      # HTML template
└── .gitignore          # Root git ignore file
```

##  License
This project is for educational purposes as part of the WDD Lab assignments.
