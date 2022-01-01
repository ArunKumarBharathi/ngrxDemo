import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedLoadingState } from "./sharedstate";

export const SHARED_LOADER="Shared Loader";

export const loaderSelector = createFeatureSelector<SharedLoadingState>(SHARED_LOADER);

export const loaderSpinnerSlector =createSelector(loaderSelector,(state) =>{
    return state.stat
})
export const errorSpinnerSlector =createSelector(loaderSelector,(state) =>{
    return state.errMsg
})