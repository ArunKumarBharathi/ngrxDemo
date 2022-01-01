import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../service/AuthGaurd";
import { PostResolverService } from "../service/post-resolver.service";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostsComponent } from "./posts.component";

const routes:Routes=[
    {path:'',component:PostsComponent,canActivate:[AuthGuard],resolve:{Post:PostResolverService},children:[
        {path:'addpost',component:AddPostComponent},
        {path:'editpost/:id',component:EditPostComponent}
    ]},
    
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PostRoutingModule{}