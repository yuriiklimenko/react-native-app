import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  query,
  where,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import { postsSlice } from "./postsSlice";

export const uploadPostToServer = (post) => async (_, getState) => {
  const { userId } = getState().auth;

  try {
    await addDoc(collection(db, "posts"), {
      ...post,

      userId,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// ---------------------------------------

export const getPosts = () => async (dispatch, getState) => {
  const { userId } = getState().auth;

  try {
    const res = query(collection(db, "posts"), where("userId", "==", userId));

    const resSnapshot = await getDocs(res);

    const allPosts = [];

    resSnapshot.forEach((doc) =>
      allPosts.push({ ...doc.data(), idPost: doc.id })
    );

    dispatch(postsSlice.actions.updatePosts(allPosts));
    return allPosts;
  } catch (error) {
    console.log(error.message);
  }
};

// ---------------------------------------

export const uploadComments = (comment) => async (_, getState) => {
  const { userId } = getState().auth;

  try {
    await addDoc(collection(db, "comments"), {
      ...comment,
      userId,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// ---------------------------------------

export const getCommentsByPostId = (idPost) => async (dispatch) => {
  try {
    const res = query(
      collection(db, "comments"),
      where("idPost", "==", idPost)
    );
    const querySnapshot = await getDocs(res);
    const allComments = [];
    querySnapshot.forEach((doc) => allComments.push(doc.data()));

    const postRef = doc(db, "posts", idPost);

    await updateDoc(postRef, {
      countComments: allComments.length,
    });

    dispatch(postsSlice.actions.updateComments(allComments));
    dispatch(
      postsSlice.actions.updateCountComments({
        id: idPost,
        countComments: allComments.length,
      })
    );
  } catch (error) {
    console.log(error.message);
  }
};
