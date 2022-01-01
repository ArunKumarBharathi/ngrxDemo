import { createAction, props } from "@ngrx/store";
import { User } from "src/app/Model/user.model";

export const LOGIN_START="[Auth Page] Login start";
export const LOGIN_SUCCESS="[Auth Page] Login success"
export const LOGIN_ERROR="[Auth Page] Login error"
export const SIGNUP_START="[Auth Page] signup start";
export const SIGNUP_SUCCESS="[Auth Page] signup success"
export const SIGNUP_ERROR="[Auth Page] signup error"
export const AUTO_LOGIN="[Auth Page] Auto Login"
export const AUTO_LOGOUT="[Auth Page] Auto Logout"
export const loginStart=createAction(LOGIN_START,props<{email:string,password:string}>());
export const loginSuccess=createAction(LOGIN_SUCCESS,props<{user:User,redirect:boolean}>())
export const loginError=createAction(LOGIN_ERROR)
export const signupStart=createAction(SIGNUP_START,props<{email:string,password:string}>());
export const signupSuccess=createAction(SIGNUP_SUCCESS,props<{user:User}>())
export const signupError=createAction(SIGNUP_ERROR)
export const autoLogin=createAction(AUTO_LOGIN)
export const autoLogout=createAction(AUTO_LOGOUT)

