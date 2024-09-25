import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  try {
    if (!user?.email) {
      return NextResponse.json(
        { message: "Not Authenticated!" },
        { status: 401 }
      );
    }
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const file: any = formData.get("image") as File | null;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required." },
        { status: 400 }
      );
    }

    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(fileBuffer);
      const result = await new Promise<any>((resolve, reject) => {
        const UploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        UploadStream.end(buffer);
      });
      await prisma.post.create({
        data: {
          title: title,
          content: content,
          authorEmail: user.email,
          imageUrl: result.secure_url,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Successfully created blog.",
      });
    }

    return NextResponse.json(
      { message: "Image is required." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { message: "Something went wrong!", error: error.message },
      { status: 500 }
    );
  }
}
