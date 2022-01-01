import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.action";
import { catchError, exhaustMap, map, mergeMap, tap } from "rxjs/operators"
import { AuthService } from "./auth.service";
import { AuthResponseData } from "src/app/Model/Auth.model";
import { Store } from "@ngrx/store";
import { errorStatus, loadingStatus } from "src/app/Shared/shared.action";
import { of } from "rxjs";
import { Router } from "@angular/router";
@Injectable()
export class AuthEffects {
    constructor(private action$: Actions, private authService: AuthService, private store: Store, private router: Router) { }
    login$ = createEffect(() => {
        return this.action$.pipe(ofType(loginStart),
            exhaustMap((action) => {
                console.log(action)
                return this.authService.login(action.email, action.password).pipe(
                    map((data: AuthResponseData) => {
                        console.log(data)
                        this.store.dispatch(loadingStatus({ status: false }))
                        this.store.dispatch(errorStatus({ error: '' }))
                        let user = this.authService.createUser(data)
                        this.authService.setUser(user);
                        return loginSuccess({ user:user,redirect:true })
                    }),
                    catchError((data) => {
                        console.log(data.error.error.message)
                        this.store.dispatch(loadingStatus({ status: false }))
                        return of(errorStatus({ error: data.error.error.message }))
                    })
                )
            }))
    })

    error$ = createEffect(() => {
        return this.action$.pipe(ofType(loginSuccess),
            tap((action) => {
                if(action.redirect){
                    this.router.navigate(['/'])
                }
               
            }
            )
        )
    }, { dispatch: false })

    signup$ = createEffect(() => {
        return this.action$.pipe(ofType(signupStart),
            exhaustMap((action) => {
                return this.authService.signup(action.email, action.password).pipe(
                    map((data: AuthResponseData) => {
                        this.store.dispatch(loadingStatus({ status: false }))
                        this.store.dispatch(errorStatus({ error: '' }))
                        let user = this.authService.createUser(data)
                        return signupSuccess({ user })
                    }),
                    catchError((data) => {
                        console.log(data.error.error.message)
                        this.store.dispatch(loadingStatus({ status: false }))
                        return of(errorStatus({ error: data.error.error.message }))
                    })
                )
            }))
    })

    
    autoLogin$=createEffect(() =>{
        return this.action$.pipe(ofType(autoLogin),
        mergeMap((action) =>{
            let user =this.authService.getUser()
            return of(loginSuccess({user:user,redirect:false}))
        }))
    })

    autoLogout$=createEffect(() =>{
        return this.action$.pipe(ofType(autoLogout),
        map((action) =>{
            this.authService.logout()
            this.router.navigate(['auth'])
        }))
    },{dispatch:false})

    
}