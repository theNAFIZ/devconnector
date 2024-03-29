import {
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  UPDATE_LIKES,
  DELETE_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  postloading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        postloading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        post: null,
        loading: false,
        postloading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        postloading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        postloading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          )
        },
        postloading: false
      };
    default:
      return state;
  }
}
