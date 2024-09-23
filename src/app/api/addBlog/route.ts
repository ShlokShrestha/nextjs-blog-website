import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  try {
    if (!user?.email) {
      return NextResponse.json(
        { message: "Not Authenticated!" },
        { status: 401 }
      );
    }
    const { title, content } = await req.json();
    const createBlogPost = await prisma.post.create({
      data: { title: title, content: content, authorEmail: user.email },
    });
    if (createBlogPost) {
      return NextResponse.json({
        success: true,
        message: "Successfull create blog ",
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
