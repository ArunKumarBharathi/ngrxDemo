import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { PostsComponent } from './posts/posts.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { PostResolverService } from './service/post-resolver.service';

const routes: Routes = [
  {path:'',loadChildren :() =>import('./counter/counter.module').then(m => m.CounterModule)},
  {path:'counter',loadChildren :() =>import('./counter/counter.module').then(m => m.CounterModule)},
  {path:'post',
  loadChildren :() =>import('./posts/post.module').then(m => m.PostModule)},
  {path:'auth',
  loadChildren :() =>import('./auth/auth.module').then(m => m.AuthModule)},
  {path:'post/details/:id',component:SinglePostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
