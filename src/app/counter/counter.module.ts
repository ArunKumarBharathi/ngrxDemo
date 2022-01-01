import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { counterReducer, postReducer } from "../Reducer/reducer";
import { CounterRoutingModule } from "./counter-routing.module";
import { CounterComponent } from "./counter.component";

@NgModule({
    declarations:[ 
        CounterComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CounterRoutingModule,
        StoreModule.forFeature('counter',counterReducer)
    ],
    exports:[],
    providers:[]
})
export class CounterModule{

}