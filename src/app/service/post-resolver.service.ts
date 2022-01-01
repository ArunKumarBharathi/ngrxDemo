import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { PostService } from '../posts/post.service';

@Injectable({
  providedIn: 'root'
})
export class PostResolverService implements Resolve<Boolean> {

  constructor(private postServ:PostService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Boolean | Observable<Boolean> | Promise<Boolean> {
    return this.postServ.loaded$.pipe(
      tap((load) =>{
        if(!load){
          this.postServ.getAll();
        }
      }),
      first()
    )
    

  }
}
