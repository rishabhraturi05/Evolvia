# Authentication Setup Guide

## Required Dependencies

Install the following packages for authentication:

```bash
npm install bcryptjs jsonwebtoken
```

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB=SIH

# JWT Secret (change this to a secure random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
```

## Database Setup

1. Make sure MongoDB is running on your system
2. The application will automatically connect to the "SIH" database
3. User profiles will be stored in the "profiles" collection

## Features Implemented

### User Model (`src/models/User.js`)
- Password hashing with bcrypt
- Email validation
- Password strength requirements (minimum 6 characters)
- Automatic password hashing before saving
- Password comparison method
- JSON output without password field

### API Routes

#### Signup (`/api/auth/signup`)
- Validates all required fields
- Checks for existing users
- Password confirmation validation
- Returns JWT token and user data

#### Login (`/api/auth/login`)
- Email and password validation
- User authentication
- JWT token generation
- Returns user data and token

### Frontend Updates

#### Signup Page (`src/app/sign-up/page.js`)
- Updated to use `/api/auth/signup` endpoint
- Maintains all existing validation
- Stores JWT token in localStorage
- Redirects to home page on success

#### Login Page (`src/app/login/page.js`)
- Updated to use `/api/auth/login` endpoint
- Stores JWT token in localStorage
- Redirects to home page on success

## Security Features

- Passwords are hashed using bcrypt with salt rounds of 12
- JWT tokens expire after 7 days
- Email uniqueness validation
- Input validation and sanitization
- Error handling for various scenarios

## Usage

1. Users can sign up with first name, last name, email, and password
2. Passwords must be at least 6 characters long
3. Email addresses must be unique
4. Users can log in with their email and password
5. JWT tokens are stored in localStorage for session management
6. User data is stored in MongoDB under the "profiles" collection

## Testing

1. Start your MongoDB service
2. Run `npm run dev` to start the development server
3. Navigate to `/sign-up` to create a new account
4. Navigate to `/login` to sign in with existing credentials
5. Check your MongoDB to verify user data is being stored correctly
