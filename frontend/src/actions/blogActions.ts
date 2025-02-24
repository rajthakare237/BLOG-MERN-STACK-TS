import axios from "axios";

export const ADD_BLOG = "ADD_BLOG";
export const SET_BLOGS = "SET_BLOGS";

//Fetch all blogs
export const fetchBlogs = () => async (dispatch: any) => {
    const respose = await axios.get("http://localhost:5000/blogs");
    dispatch({type:SET_BLOGS, payload: respose.data});
};

// Add a new blog
export const addBlog = (blogData: any) => async (dispatch: any) => {
    const response = await axios.post("http://localhost:5000/blogs/create", blogData);
    dispatch({ type: ADD_BLOG, payload: response.data });
  };