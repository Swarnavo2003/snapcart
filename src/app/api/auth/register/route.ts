import connectDB from "@/lib/db";
import User, { IUser } from "@/models/user.model";
import { ApiResponse } from "@/types/api-response";
import { registerSchema } from "@/validations";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues
        .map((issue) => issue.message)
        .join(", ");

      return NextResponse.json<ApiResponse<null>>(
        {
          timestamp: new Date().toISOString(),
          message: "Validation error",
          data: null,
          error: errors,
        },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json<ApiResponse<null>>(
        {
          timestamp: new Date().toISOString(),
          message: "User already exists",
          data: null,
          error: "User with this email already exists",
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
