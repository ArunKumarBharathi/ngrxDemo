import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Posts } from "../Model/post.model";

export const LOAD_POSTS = '[posts page] load posts';
export const LOAD_POSTS_SUCCESS = '[posts page] load posts success';
export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const reset = createAction('reset');
export const newVal = createAction('newv',props<{val:number}>())
export const addPosts=createAction('Add Post',props<{post:Posts}>())
export const addPostSuccess=createAction('Add Post Success',props<{post:Posts}>())
export const updatePost=createAction('Update Post',props<{post:Posts}>())
export const updatePostSuccess=createAction('Update Post Success',props<{post:Update<Posts>}>())
export const deletePost=createAction('Delete Post',props<{id:number,key:string}>())
export const deletePostSuccess=createAction('Delete Post Success',props<{id:number}>())
export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(
  LOAD_POSTS_SUCCESS,
  props<{ posts: Posts[] }>()
);



// export const addPost = createAction(ADD_POST_ACTION, props<{ post: Posts }>());
// export const addPostSuccess = createAction(
//   ADD_POST_SUCCESS,
//   props<{ post: Posts }>()
// );

