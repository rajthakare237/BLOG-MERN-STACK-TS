import axios from "axios";

export const createBlog = async (blog: {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  author: string;
  date: string;
}) => {
  return await axios.post("http://localhost:5000/blogs/create", blog);
};

export const updateBlog = async (id: string, blog: {title: string;
  description: string;
  category: string;
  imageUrl: string;
  author: string;
  date: string;}) => {
    return await axios.put(`http://localhost:5000/blogs/update/${id}`,blog);
  };

// Add to blogService.ts
export const getBlogById = async (id: string) => {
  return axios.get(`http://localhost:5000/blogs/${id}`);
};

export const getBlogs = async () => {
  return await axios.get("http://localhost:5000/blogs");
};

export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);
  return await axios.post("http://localhost:5000/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
