import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomStateUrl } from "./custom.serializer";
import { getRouterSelector } from "./Router.selector";
import { counterState, postEntityAdapter, postState } from "./state";

const counterSelector=createFeatureSelector<counterState>('counter');
const postSelector=createFeatureSelector<postState>('post');

export const getCounter=createSelector(counterSelector, (state) => {return state.counter});

export const postSelectors = postEntityAdapter.getSelectors()
export const getPost = createSelector(postSelector,postSelectors.selectAll);

export const getPostEntities = createSelector(
    postSelector,
    postSelectors.selectEntities
  );
  
//   export const getPostById = createSelector(
//     getPostEntities,
//     getCurrentRoute,
//     (posts, route: RouterStateUrl) => {
//       return posts ? posts[route.params['id']] : null;
//     }
//   );

export const updatePostById = createSelector(getPostEntities,getRouterSelector,(posts,route:CustomStateUrl) =>{
    
    return posts ? posts[route.params['id']] : null;
})