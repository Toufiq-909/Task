# Task Management App - React & Express

A full-stack task management application built with React, Next.js, and Express.js with MongoDB database.

## Project Structure

```
├── app/                          # Next.js app (React frontend)
│   ├── page.tsx                 # Home page (redirects to dashboard/login)
│   ├── login/page.tsx           # Login page
│   ├── signup/page.tsx          # Signup page
│   ├── dashboard/page.tsx       # Main dashboard
│   ├── layout.tsx               # Root layout with auth provider
│   └── globals.css              # Global styles
├── components/
│   ├── protected-route.tsx      # Protected route wrapper
│   ├── task-form.tsx            # Create task form
│   └── task-list.tsx            # Task list display
├── lib/
│   ├── api.ts                   # API client with axios
│   ├── auth-context.tsx         # Authentication context
│   └── utils.ts                 # Utility functions
├── server/                       # Express backend
│   ├── index.js                 # Express server entry point
│   ├── models/
│   │   ├── User.js              # User MongoDB model
│   │   └── Task.js              # Task MongoDB model
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints (signup/login)
│   │   └── tasks.js             # Task CRUD endpoints
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── package.json             # Server dependencies
│   └── .env.example             # Example environment variables
├── .env.local.example           # Frontend environment variables
└── package.json                 # Frontend dependencies
```

## Features

- **Authentication**: User signup and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **State Management**: React Context for authentication state
- **API Integration**: Axios for backend communication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or pnpm

## Installation

### 1. Frontend Setup

```bash
# Install frontend dependencies
npm install
# or
pnpm install

# Copy and configure environment variables
cp .env.local.example .env.local
# Update NEXT_PUBLIC_API_URL if needed
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install server dependencies
npm install
# or
pnpm install

# Copy and configure environment variables
cp .env.example .env

# Update .env with your MongoDB URI and JWT secret
# Example:
# MONGODB_URI=mongodb://localhost:27017/task-app
# JWT_SECRET=your-secret-key-here
# PORT=5000
```

## Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Start Express Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Start Next.js Frontend:**
```bash
npm run dev
# Frontend runs on http://localhost:3000
```

### Option 2: Using Concurrently (Recommended)

Update your main `package.json` to include:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:client\" \"npm run dev:server\"",
    "dev:client": "next dev",
    "dev:server": "cd server && npm run dev"
  }
}
```

Then run:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (server/.env)
```
MONGODB_URI=mongodb://localhost:27017/task-app
JWT_SECRET=your-secret-key-here
PORT=5000
NODE_ENV=development
```


## Security Considerations

- Passwords are hashed with bcryptjs
- JWT tokens are stored in localStorage
- Protected routes check authentication before rendering
- CORS is configured for frontend requests
- Environment variables keep secrets secure

## Technologies Used

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Lucide React Icons

### Backend
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally: `mongod`
- Or update `MONGODB_URI` to use MongoDB Atlas cloud database

### CORS Issues
- Check that `NEXT_PUBLIC_API_URL` is correctly set in frontend
- Verify backend is running and CORS is enabled

### Authentication Errors
- Clear browser localStorage and try again
- Check that JWT_SECRET is set in backend .env
- Verify token is being sent in API requests

## License

MIT
