import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import Grocery, { IGrocery } from "@/models/grocery.model";
import { ApiResponse } from "@/types/api-response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json<ApiResponse<null>>(
        {
          timestamp: new Date().toISOString(),
          message: "Unauthorized",
          data: null,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") as string;
    const unit = formData.get("unit") as string;
    const file = formData.get("image") as Blob | null;
    let imageUrl;
    if (file) {
      imageUrl = await uploadOnCloudinary(file);
    }

    const grocery = await Grocery.create({
      name,
      price,
      category,
      unit,
      image: imageUrl,
    });

    return NextResponse.json<ApiResponse<IGrocery>>(
      {
        timestamp: new Date().toISOString(),
        message: "Grocery added successfully",
        data: grocery,
        error: null,
      },
      { status: 201 }
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
