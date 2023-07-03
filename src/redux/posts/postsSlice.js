import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  comments: [],
  pictureData: {},
};
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // ---------------------
    updatePosts: (state, { payload }) => ({
      ...state,
      posts: payload,
    }),
    // ---------------------
    updatePicture: (state, { payload }) => {
      return { ...state, pictureData: payload };
    },

    // -----------------
    updateComments: (state, { payload }) => ({
      ...state,
      comments: payload,
    }),
    // -----------------
    updateCountComments: (state, { payload }) => {
      const { id, countComments } = payload;
      const updatedPosts = state.posts.map((post) => {
        if (post.idPost === id) {
          return { ...post, countComments };
        }
        return post;
      });
      return { ...state, posts: updatedPosts };
    },
  },
});
