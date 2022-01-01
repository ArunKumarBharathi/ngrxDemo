import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, newVal, reset } from '../Reducer/action';
import { AppState, counterState, initialState} from '../Reducer/state';
import { getCounter } from '../Reducer/selector'
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  counter$:Observable<number>
  value:number;
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
   this.counter$ = this.store.select(getCounter)
  }
  increment(){
    this.store.dispatch(increment())
  }
  decrement(){
    this.store.dispatch(decrement())
  }
  reset(){
    this.store.dispatch(reset())
  }
  add(){
    this.store.dispatch(newVal({val:+this.value}))
  }
}

