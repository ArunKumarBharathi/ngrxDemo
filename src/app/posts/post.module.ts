import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { PostEffects } from "../Reducer/Post.effects";
import { postReducer } from "../Reducer/reducer";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostRoutingModule } from "./post-routing.module";
import { PostsComponent } from "./posts.component";
import { SinglePostComponent } from './single-post/single-post.component';

@NgModule({
    declarations:[ 
        PostsComponent,
        AddPostComponent,
        EditPostComponent,
        SinglePostComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PostRoutingModule,
        StoreModule.forFeature('post',postReducer),
        EffectsModule.forFeature([PostEffects])
    ],
    exports:[],
    providers:[]
})
export class PostModule{

}