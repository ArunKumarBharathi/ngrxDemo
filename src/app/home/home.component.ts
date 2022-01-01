import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogout } from '../auth/State/auth.action';
import { isAuthenticated } from '../auth/State/auth.selector';
import { AppState } from '../Reducer/state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Authenticated:Observable<boolean>
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.Authenticated= this.store.select(isAuthenticated)
  }
  logout(event:Event){
    event.preventDefault();
    this.store.dispatch(autoLogout())
  }
}
