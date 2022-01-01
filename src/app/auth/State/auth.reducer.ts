import { createReducer, on } from "@ngrx/store"
import { autoLogout, loginSuccess, signupSuccess } from "./auth.action"
import { initialState } from "./auth.state"

export function AuthReducer(state,action){
    return _authReducer(state,action)
}
const _authReducer =createReducer(initialState,
    on(loginSuccess,(state,action) =>{
        return {...state,user:action.user}
    }),
    on(signupSuccess,(state,action) =>{
        return {...state,user:action.user}
    }),
    on(autoLogout,(state,action) =>{
        return {...state,user:null}
    })
    )

// import { createReducer } from '@ngrx/store';
// import { initialState } from './auth.state';

// const _authReducer = createReducer(initialState);

// export function AuthReducer(state, action) {
//   return _authReducer(state, action);
// }
