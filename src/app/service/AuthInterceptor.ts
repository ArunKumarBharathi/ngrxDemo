import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../Reducer/state';
import { getToken } from '../auth/State/auth.selector';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store:Store<AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(getToken).pipe(
            take(1),
            exhaustMap((data) =>{
            if(!data){
                return next.handle(req);
            }
            let modreq=req.clone({params: req.params.append('auth',data)});
            return next.handle(modreq)
        }))
        
    }
}