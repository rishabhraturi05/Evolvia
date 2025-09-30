import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const { firstName, lastName, email, password, confirmPassword } = await request.json();

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: 'All fields are required', field: 'general' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: 'Passwords do not match', field: 'confirmPassword' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long', field: 'password' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists', field: 'email' },
        { status: 409 }
      );
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Return user data without password
    const userData = user.toJSON();

    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: userData,
        token
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'User with this email already exists', field: 'email' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
