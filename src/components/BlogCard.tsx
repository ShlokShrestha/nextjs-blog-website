import React from "react";
import Link from "next/link";
import Image from "next/image";
import DefaultImage from "../assets/defaultImage.png";
import DefaultUser from "../assets/defaultUser.png";
import moment from "moment";

const BlogCard = (props: any) => {
  const { post } = props;
  
  return (
    <div>
      <Link
        key={post.id}
        href={`/blogs/${post.id}`}
        className="bg-white rounded-md shadow-md"
      >
        {post?.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt="blog-image"
            width={350}
            height={350}
            className=" rounded-2xl"
          />
        ) : (
          <Image
            src={DefaultImage}
            alt="default-image"
            width={350}
            height={200}
            className=" rounded-2xl h-[12rem]"
          />
        )}
        <div className="pt-5">
          <h4 className="bg-gray-200 rounded p-2 w-36">Category</h4>
          <h2 className="text-xl font-bold capitalize pt-2">{post.title}</h2>
          <div className="flex my-2 gap-x-2">
            <Image
              src={post.author?.image ? post.author?.image : DefaultUser}
              alt="default-image"
              width={40}
              height={40}
              className=" rounded-lg "
            />
            <span>
              <p className="font-semibold">By: {post.author?.name}</p>
              <p className="text-xs">
                {moment(post.createdAt).format("yyyy-MM-DD HH:MM:SS")}
              </p>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
