import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Posts } from 'src/app/Model/post.model';
import { updatePostById } from 'src/app/Reducer/selector';
import { AppState } from 'src/app/Reducer/state';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  post:Observable<Posts>
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.post=this.store.select(updatePostById)
  }

}
