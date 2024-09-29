import AddNewBlog from "@/components/AddNewBlog";
import prisma from "@/lib/prisma";
import Link from "next/link";

const BlogsPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  return (
    <div className="max-w-4xl mx-auto py-8">
      <AddNewBlog />
    </div>
  );
};

export default BlogsPage;
