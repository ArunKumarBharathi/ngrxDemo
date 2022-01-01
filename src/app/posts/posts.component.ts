import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Posts } from '../Model/post.model';
import { deletePost,  loadPosts } from '../Reducer/action';
import { getPost } from '../Reducer/selector';
import { AppState } from '../Reducer/state';
import { loadingStatus } from '../Shared/shared.action';
import { PostService } from './post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  post$:Observable<Posts[]>
  constructor(private store:Store<AppState>,private postServ:PostService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.post$=this.postServ.entities$
    // this.post$=this.store.select(getPost)
    // this.store.dispatch(loadPosts())
    // this.postServ.getPosts().subscribe((data) =>{
    //   console.log(data)
    // })
  }
  delete(id,key){
    // this.store.dispatch(deletePost({id,key}))
    this.postServ.delete(id,key)

  }
}
