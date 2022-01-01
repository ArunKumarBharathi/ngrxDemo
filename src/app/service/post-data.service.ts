import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Posts } from '../Model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostDataService extends DefaultDataService<Posts> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  getAll(): Observable<Posts[]> {
    return this.http
      .get(`https://awesome-51635-default-rtdb.firebaseio.com/posts.json`)
      .pipe(
        map((data) => {
          const posts: Posts[] = [];
          for (let key in data) {
            posts.push({ ...data[key] });
          }
          return posts;
        })
      );
  }

  add(post:Posts):Observable<Posts>{
    return this.http
      .post<{name:string}>(`https://awesome-51635-default-rtdb.firebaseio.com/posts.json`,post).pipe(
        map((data) =>{
          return { ...post}
        })
      )
  }
  update(post: Update<Posts>): Observable<Posts> {
    return this.http.put<Posts>(
      `https://awesome-51635-default-rtdb.firebaseio.com/posts/${post.id}.json`,
      { ...post.changes }
    );
  }

  delete(id: string): Observable<string> {
    return this.http
      .delete(`https://awesome-51635-default-rtdb.firebaseio.com/posts/${id}.json`)
      .pipe(
        map((data) => {
          return id;
        })
      );
  }
}
