// import Comments from "@/components/comments";
// import FormComment from "@/components/form-comments";
import prisma from "@/lib/prisma";
import { FC } from "react";
import Image from "next/image";
import DefaultImage from "../../../assets/defaultImage.png";
import DefaultUser from "../../../assets/defaultUser.png";
import moment from "moment";

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}
const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex flex-col gap-y-2 items-center justify-center mb-4">
        <h1 className="text-sm">Category</h1>
        <h1 className="text-4xl font-bold">{post?.title}</h1>
        <span className="">
          {moment(post?.createdAt).format("yyyy-MM-DD HH:MM:SS")}
        </span>
        <span>Written by: {post?.author?.name}</span>
      </div>

      <div className="mx-auto">
        {post?.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt="blog-image"
            width={820}
            height={820}
            className=" rounded-2xl mx-auto"
          />
        ) : (
          <Image
            src={DefaultImage}
            alt="default-image"
            width={820}
            height={820}
            className=" rounded-2xl mx-auto"
          />
        )}
      </div>
      <div className="mt-6 w-4/6 mx-auto">{post?.content}</div>
      {/* <Comments postId={params.id} />
      <FormComment postId={params.id} /> */}
    </div>
  );
};

export default BlogDetailPage;
