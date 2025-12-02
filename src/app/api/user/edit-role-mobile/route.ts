import { auth } from "@/auth";
import connectDB from "@/lib/db";
import User, { IUser } from "@/models/user.model";
import { ApiResponse } from "@/types/api-response";
import { editRoleMobileSchema } from "@/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const session = await auth();

    const validation = editRoleMobileSchema.safeParse(body);

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

    const { mobile, role } = validation.data;

    const user = await User.findOneAndUpdate(
      { email: session?.user?.email },
      { mobile, role },
      { new: true }
    );

    if (!user) {
      return NextResponse.json<ApiResponse<null>>(
        {
          timestamp: new Date().toISOString(),
          message: "User not found",
          data: null,
          error: "User not found",
        },
        { status: 400 }
      );
    }

    return NextResponse.json<ApiResponse<IUser>>(
      {
        timestamp: new Date().toISOString(),
        message: "User updated successfully",
        data: user,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        timestamp: new Date().toISOString(),
        message: "Something went wrong",
        data: null,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
