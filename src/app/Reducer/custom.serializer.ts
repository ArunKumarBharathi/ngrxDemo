import { Params, RouterStateSnapshot } from "@angular/router";
import { RouterStateSerializer } from "@ngrx/router-store";

export interface CustomStateUrl{
    url:string;
    params:Params;
    queryParams:Params;
}

export class CustomStateSerializer implements RouterStateSerializer<CustomStateUrl>{
    serialize(routerState: RouterStateSnapshot): CustomStateUrl {
        let route =routerState.root
        while(route.firstChild){
            route=route.firstChild
        }
        const {url, root: {queryParams}}=routerState
        const {params} =route
        
        return {url,queryParams,params}
    }

}