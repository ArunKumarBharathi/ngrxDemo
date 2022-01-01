import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Posts } from '../Model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService extends EntityCollectionServiceBase<Posts>{

  constructor(private http:HttpClient,serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Post',serviceElementsFactory)
   }

  // getPost(){
  //  return this.http.get(`https://awesome-51635-default-rtdb.firebaseio.com/posts`).pipe(map((data) =>{
  //    console.log(data)
  //  }))
  // }
  getPosts(): Observable<Posts[]> {
    return this.http
      .get<Posts[]>(`https://awesome-51635-default-rtdb.firebaseio.com/posts.json`)
      .pipe(
        map((data) => {
          const posts: Posts[] = [];
          for (let key in data) {
            posts.push({ ...data[key],key:key});
          }
          return posts;
        })
      );
  }
  addPost(post:Posts):Observable<{name:string}>{
    return this.http
      .post<{name:string}>(`https://awesome-51635-default-rtdb.firebaseio.com/posts.json`,post)
  }
  
  updatePost(post:Posts){
    const postData = {
      [post.key]: { title: post.title, description: post.description, id:post.id },
    };
    return this.http
      .patch(`https://awesome-51635-default-rtdb.firebaseio.com/posts.json`,postData)
  }
  deletePost(id){
   
    return this.http
      .delete(`https://awesome-51635-default-rtdb.firebaseio.com/posts/${id}.json`)
  }
  singlePost(id):Observable<Posts>{
   
    return this.http
      .get<Posts>(`https://awesome-51635-default-rtdb.firebaseio.com/posts/${id}.json`)
  }
}
