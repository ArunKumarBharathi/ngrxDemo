import { routerReducer } from "@ngrx/router-store"
import { createReducer, on } from "@ngrx/store"
import { AuthReducer } from "../auth/State/auth.reducer"
import { AUTH_STATE_NAME } from "../auth/State/auth.selector"
import { LoaderReducer } from "../Shared/shared.reducer"
import { SHARED_LOADER } from "../Shared/shared.selector"
import {  addPostSuccess, decrement, deletePost, deletePostSuccess, increment, loadPostsSuccess, newVal, reset, updatePost, updatePostSuccess } from "./action"
import { initialState,initialPost, postEntityAdapter } from "./state"

const _counterReducer =createReducer(initialState,
    on(increment,(state) =>{
    return {...state,counter:state.counter+1}}),
    on(decrement,(state) =>{
        return {...state,counter:state.counter-1}}),
    on(reset,(state) =>{
        return {...state,counter:0}}),
    on(newVal,(state,action) =>{
        return {...state,counter:state.counter+action.val}}),
        
    )

export function counterReducer(action,state){
    return _counterReducer(action,state)
}

const _postReducer =createReducer(initialPost,
    on(addPostSuccess,(state,action) =>{
      return postEntityAdapter.setOne(action.post,state)
    }),
    on(updatePostSuccess,(state,action) =>{
        return postEntityAdapter.updateOne(action.post,state)
    }),
    on(deletePostSuccess,(state,action) =>{
        return postEntityAdapter.removeOne(action.id,state)
    }),
    on(loadPostsSuccess, (state, action) => {
       return postEntityAdapter.setAll(action.posts,state)
      })
    )
export function postReducer(action,state){
    return _postReducer(action,state)
}

export const appReducer ={
   [SHARED_LOADER]:LoaderReducer,
   [AUTH_STATE_NAME]:AuthReducer,
   router:routerReducer
}

// export function addPostReducer(action,state){
//     return _addPostReducer(action,state)
// }

// export _addPostReducer =createReducer()