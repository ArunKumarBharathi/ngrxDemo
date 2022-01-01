import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../Reducer/state';
import { loadingStatus } from '../Shared/shared.action';
import { errorSpinnerSlector } from '../Shared/shared.selector';
import { loginStart } from './State/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.minLength(6)]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }
  login(){
    const email=this.loginForm.value.email
    const password=this.loginForm.value.password
    console.log(email,password)
    this.store.dispatch(loadingStatus({status:true}))
    this.store.dispatch(loginStart({email,password}))
  }
  
  posterror(){
    if(this.loginForm.controls.email.touched && !this.loginForm.controls.email.valid ){
      if(this.loginForm.controls.email.errors.required){
        return 'Required field'
      }
      if(this.loginForm.controls.email.errors.minlength){
        return 'enter minimum 6 character'
      }else{
        return null
      }
    }else {
      return null;
    }
   
  }
  desError(){
    if(this.loginForm.controls.password.touched && !this.loginForm.controls.password.valid ){
      if(this.loginForm.controls.password.errors.required){
        return 'Required field'
      }
      if(this.loginForm.controls.password.errors.minlength){
        return 'enter minimum 6 character'
      }else{
        return null
      }
    }else {
      return null;
    }
  }
}
