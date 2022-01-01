import { createReducer, on } from "@ngrx/store"
import { errorStatus, loadingStatus } from "./shared.action"
import { initialLoad } from "./sharedstate"

export function LoaderReducer(state,action){
    return _loaderReducer(state,action)
}

const _loaderReducer = createReducer(initialLoad,
    on(loadingStatus,(state,action) =>{
        return {...state,stat:action.status}
    }),
    on(errorStatus,(state,action) =>{
        console.log(action)
        return {...state,errMsg:action.error}
    }))
    