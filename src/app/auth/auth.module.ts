import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { AuthEffects } from "./State/auth.effects";
import { AuthReducer } from "./State/auth.reducer";
import { AUTH_STATE_NAME } from "./State/auth.selector";
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
    declarations:[ 
        AuthComponent, SignUpComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        EffectsModule.forFeature()
    ],
    exports:[],
    providers:[]
})
export class AuthModule{

}