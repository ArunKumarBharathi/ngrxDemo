import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Reducer/state';
import { loadingStatus } from 'src/app/Shared/shared.action';
import { loginStart, signupStart } from '../State/auth.action';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.minLength(6)]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }
  signup(){
    const email=this.loginForm.value.email
    const password=this.loginForm.value.password
    console.log(email,password)
    this.store.dispatch(loadingStatus({status:true}))
    this.store.dispatch(signupStart({email,password}))
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
