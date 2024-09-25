"use client";
import { FormDatas } from "@/types/blog";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

const inputClass =
  "w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300";

const AddNewBlog = () => {
  const [formDatas, setFormDatas] = useState<FormDatas>({
    title: "",
    content: "",
  });
  const [file, setFile] = useState<File | null>(null); // Explicitly declare as File or null
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormDatas({
      ...formDatas,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", formDatas.title);
    formData.append("content", formDatas.content);
    if (file) {
      formData.append("image", file); // Match the file name used in your API route
    }

    setLoading(true); // Set loading state
    try {
      const response = await axios.post("/api/addBlog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        // Clear form data
        setFormDatas({ title: "", content: "" });
        setFile(null);
        router.push(`/blogs`);
      }
    } catch (error: any) {
      console.error("Error creating blog post:", error.response?.data || error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          className={inputClass}
          placeholder="Enter the title"
          name="title"
          value={formDatas.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="file"
          name="image" // Match with the API
          id="file"
          accept="image/*" // Optional: restrict to image files
          onChange={(e: any) => setFile(e.target.files[0])}
        />
      </div>
      <div className="mb-4">
        <ReactTextareaAutosize
          minRows={5}
          name="content"
          className={inputClass}
          placeholder="Enter the content"
          value={formDatas.content}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full ${
          loading ? "disabled:bg-gray-400" : ""
        }`}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AddNewBlog;
