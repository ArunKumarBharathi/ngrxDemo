import { createAction, props } from "@ngrx/store";

export const LOADING_STATUS="[Spinner page] loading start";
export const Error_STATUS="[Spinner page] loading error";

export const loadingStatus= createAction(LOADING_STATUS,props<{status:boolean}>())
export const errorStatus= createAction(Error_STATUS,props<{error:string}>())