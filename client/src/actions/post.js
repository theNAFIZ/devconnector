import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  UPDATE_LIKES,
  DELETE_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

// GET POSTS
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert(err.response.statusText, 'danger'));
  }
};

// Add Post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json'
  };
  try {
    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert(err.response.statusText, 'danger'));
  }
};

// Delete Post
export const deletePost = (id, history, inside = false) => async (dispatch) => {
  try {
    if (confirm('Are you sure delete the post?')) {
      await axios.delete(`/api/posts/${id}`);

      if (inside) {
        history.push('/posts');
      }

      dispatch({
        type: DELETE_POST,
        payload: id
      });

      dispatch(setAlert('Post Deleted', 'dark'));
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert(err.response.statusText, 'danger'));
  }
};

// ADD POST LIKES
export const addLikes = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert(err.response.statusText, 'danger'));
  }
};

// REMOVE POST LIKES
export const removeLikes = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert(err.response.statusText, 'danger'));
  }
};

// GET POST
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    console.log(`error->${err}`);
    dispatch({
      type: POST_ERROR,
      payload: { msg: 'error', status: 500 }
    });
    dispatch(setAlert(err.response.statusText, 'danger'));
  }
};

// Add Post comments
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json'
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert(err.response.statusText, 'danger'));
  }
};

// Delete Post comments
export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'dark'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert(err.response.statusText, 'danger'));
  }
};
