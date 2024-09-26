import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

export async function Patch(req: NextRequest) {
  const user = await getCurrentUser();
  try {
    if (!user) {
      return NextResponse.json(
        { message: "Not Authenticated!" },
        { status: 401 }
      );
    }
    const formData = await req.formData();
    const id = formData.get("id") as string;
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
      await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          content: content,
          authorEmail: user.email,
          imageUrl: result.secure_url,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Successfull updated blog ",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "failed to update the post ! Please try again",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
