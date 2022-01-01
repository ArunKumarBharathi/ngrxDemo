import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Update } from "@ngrx/entity";
import { RouterNavigatedAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { EMPTY } from "rxjs";
import { filter, map, mergeMap, switchMap, withLatestFrom } from "rxjs/operators";
import { Posts } from "../Model/post.model";
import { PostService } from "../posts/post.service";
import { loadingStatus } from "../Shared/shared.action";
import {addPosts, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./action";
import { getPost, updatePostById } from "./selector";
import { AppState } from "./state";

@Injectable({
    providedIn:"root"
})
export class PostEffects{

    constructor(private action$:Actions,private postsService:PostService,private store:Store<AppState>){}

    loadPosts$ = createEffect(() => {
        return this.action$.pipe(
          ofType(loadPosts),
          withLatestFrom(this.store.select(getPost)),
          mergeMap(([action,post]) => {
            if(!post.length || post.length ===1){
              return this.postsService.getPosts().pipe(
                map((posts) => {
                    this.store.dispatch(loadingStatus({status:false}))
                  return loadPostsSuccess({ posts });
                })
              );
            }
            return EMPTY
            
          })
        );
      });
      addPost$ = createEffect(() => {
        return this.action$.pipe(
          ofType(addPosts),
          mergeMap((action) => {
            return this.postsService.addPost(action.post).pipe(
              map((data) => {
                const post = { ...action.post };
                return addPostSuccess({ post:post });
              })
            );
          })
        );
      });
      updatePost$ = createEffect(() => {
        return this.action$.pipe(
          ofType(updatePost),
          switchMap((action) => {
            return this.postsService.updatePost(action.post).pipe(
              map((data) => {
                const post:Update<Posts> = { 
                  id:action.post.id,
                  changes:{...action.post}
                 };
                return updatePostSuccess({ post:post });
              })
            );
          })
        );
      });
      deletePost$ = createEffect(() => {
        return this.action$.pipe(
          ofType(deletePost),
          switchMap((action) => {
            return this.postsService.deletePost(action.key).pipe(
              map((data) => {
                // const post = { ...action.post };
                return deletePostSuccess({ id:action.id });
              })
            );
          })
        );
      });
      singlePost$= createEffect(() =>{
        return this.action$.pipe(ofType(ROUTER_NAVIGATION),
        filter((r:RouterNavigatedAction)=>{
          return r.payload.routerState.url.startsWith('/post/details')
        }),
        map((r:RouterNavigatedAction) =>{
          return r.payload.routerState['params']['id']
        }),
        withLatestFrom(this.store.select(getPost)),
        switchMap(([id,post]) =>{
          console.log(id)
          if(!post.length){
            return this.postsService.singlePost(parseInt(id)-1).pipe(map((post) =>{
              console.log(post)
              const postData = [{ ...post, id}];
              return loadPostsSuccess({ posts: postData });
            }))
          }
          return EMPTY
        })
        )
      })
}