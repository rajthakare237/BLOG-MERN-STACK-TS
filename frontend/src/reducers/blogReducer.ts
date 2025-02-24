import { ADD_BLOG, SET_BLOGS } from "../actions/blogActions";

const initialState = { blogs: [] };

export const blogReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_BLOGS: return { ...state, blogs: action.payload };
    case ADD_BLOG: return { ...state, blogs: [...state.blogs, action.payload] };
    default: return state;
  }
};
