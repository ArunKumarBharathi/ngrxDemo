import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isAuthenticated } from '../auth/State/auth.selector';
import { AppState } from '../Reducer/state';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private route:Router,private store :Store<AppState>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select(isAuthenticated).pipe(map((data) =>{
            if(!data){
              return  this.route.createUrlTree(['auth'])
            }
                return true
            
        }))
        // return true;

    }
}