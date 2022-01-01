import { createEntityAdapter, EntityState } from "@ngrx/entity"
import { RouterReducerState } from "@ngrx/router-store"
import { AUTH_STATE_NAME } from "../auth/State/auth.selector"
import { AuthState } from "../auth/State/auth.state"
import { Posts } from "../Model/post.model"
import { SHARED_LOADER } from "../Shared/shared.selector"
import { SharedLoadingState } from "../Shared/sharedstate"

export const initialState:counterState ={
    counter:0
}

export interface counterState{
    counter:number
}

export const postEntityAdapter=createEntityAdapter<Posts>();

export interface postState extends EntityState<Posts>{}

export const initialPost:postState=postEntityAdapter.getInitialState();


export interface AppState {
    [SHARED_LOADER]:SharedLoadingState;
    [AUTH_STATE_NAME]:AuthState;
    router:RouterReducerState
}
