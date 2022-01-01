import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogin } from './auth/State/auth.action';
import { PostService } from './posts/post.service';
import { AppState } from './Reducer/state';
import { loadingStatus } from './Shared/shared.action';
import { errorSpinnerSlector, loaderSpinnerSlector } from './Shared/shared.selector';
import { SharedLoadingState } from './Shared/sharedstate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ngrxDemo';
  isLoading:Observable<boolean>
  error:Observable<string>;
  constructor(private store:Store<AppState>){}
  ngOnInit(): void {
    this.isLoading=this.store.select(loaderSpinnerSlector)
    this.error=this.store.select(errorSpinnerSlector)
    this.store.dispatch(autoLogin())
  }
}
