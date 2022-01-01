import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const AUTH_STATE_NAME = 'auth';

export const Login_Status=createFeatureSelector<AuthState>(AUTH_STATE_NAME)

export const loginStatus=createSelector(Login_Status,(state) =>{
    return state.user
})

export const isAuthenticated=createSelector(Login_Status,(state) =>{
    return state.user? true :false
})

export const getToken=createSelector(Login_Status,(state) =>{
    return state.user? state.user.token :null
})


// export const autoLogin=createSelector(Login_Status,(state) =>{
//     return state.user
// })