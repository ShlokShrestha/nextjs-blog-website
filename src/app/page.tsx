import BlogCard from "@/components/BlogCard";
import prisma from "@/lib/prisma";

const Home = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });
  return (
    <main className="max-w-5xl mx-auto my-5">
      <h1 className="text-3xl font-bold mb-4">Blogs pagess</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <BlogCard post={post} key={index} />
        ))}
      </div>
    </main>
  );
};
export default Home;
