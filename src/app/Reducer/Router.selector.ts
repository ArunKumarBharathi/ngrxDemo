import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomStateUrl } from "./custom.serializer";

export const routerSelector =createFeatureSelector<RouterReducerState<CustomStateUrl>>('router');
export const getRouterSelector = createSelector(routerSelector,(route) =>{
    return route.state;
})