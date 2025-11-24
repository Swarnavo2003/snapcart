import connectDB from "@/lib/db";
import User, { IUser } from "@/models/user.model";
import { ApiResponse } from "@/types/api-response";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json<ApiResponse<string>>(
        {
          timestamp: new Date().toISOString(),
          message: "User already exists",
          data: null,
          error: "User with this email already exists",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json<ApiResponse<string>>(
        {
          timestamp: new Date().toISOString(),
          message: "Password too short",
          data: null,
          error: "Password too short",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    return NextResponse.json<ApiResponse<IUser>>(
      {
        timestamp: new Date().toISOString(),
        message: "User registered successfully",
        data: user,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json<ApiResponse<Error>>(
      {
        timestamp: new Date().toISOString(),
        message: "Registration Error",
        data: null,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
