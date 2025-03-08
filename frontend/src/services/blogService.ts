import axios from "axios";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const createBlog = async (blog: {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  author: string;
  date: string;
}) => {
  return await axios.post(`${backend_url}/blogs/create`, blog);
};

export const updateBlog = async (id: string, blog: {title: string;
  description: string;
  category: string;
  imageUrl: string;
  author: string;
  date: string;}) => {
    return await axios.put(`${backend_url}/blogs/update/${id}`,blog);
  };

// Add to blogService.ts
export const getBlogById = async (id: string) => {
  return axios.get(`${backend_url}/blogs/${id}`);
};

export const getBlogs = async () => {
  return await axios.get(`${backend_url}/blogs`);
};

export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);
  return await axios.post(`${backend_url}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" }, //tells the server that the request contains binary file data (like images) instead of plain text
  });
};
