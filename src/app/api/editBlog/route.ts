import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function Patch(req: NextRequest) {
  const user = await getCurrentUser();
  try {
    if (!user) {
      return NextResponse.json(
        { message: "Not Authenticated!" },
        { status: 401 }
      );
    }
    const { id, title, content } = await req.json();
    const updatedBlogPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: { title: title, content: content, authorEmail: user.email },
    });

    if (updatedBlogPost) {
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
