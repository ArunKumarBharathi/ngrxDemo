import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Posts } from 'src/app/Model/post.model';
import {  addPosts } from 'src/app/Reducer/action';
import { getPost } from 'src/app/Reducer/selector';
import { AppState } from 'src/app/Reducer/state';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  formGroup:FormGroup;
  constructor(private fb:FormBuilder,private store:Store<AppState>,private postServ:PostService) { }

  ngOnInit(): void {
    this.formGroup=this.fb.group({
      title:['',[Validators.required,Validators.minLength(6)]],
      description:['',[Validators.required,Validators.minLength(6)]]
    })
  }
  addPost(){
    let id:any
    this.store.select(getPost).subscribe((data) =>{
      id=data.length
    })
    let post:Posts={
      title:this.formGroup.value.title,
      description:this.formGroup.value.description,
      id:id+1
    }
    this.store.dispatch(addPosts({post}))
    // this.postServ.add(post).subscribe((data) =>{
    //   console.log(data)
    // })
  }
  posterror(){
    if(this.formGroup.controls.title.touched && !this.formGroup.controls.title.valid ){
      if(this.formGroup.controls.title.errors.required){
        return 'Required field'
      }
      if(this.formGroup.controls.title.errors.minlength){
        return 'enter minimum 6 character'
      }else{
        return null
      }
    }else {
      return null;
    }
   
  }
  desError(){
    if(this.formGroup.controls.description.touched && !this.formGroup.controls.description.valid ){
      if(this.formGroup.controls.description.errors.required){
        return 'Required field'
      }
      if(this.formGroup.controls.description.errors.minlength){
        return 'enter minimum 6 character'
      }else{
        return null
      }
    }else {
      return null;
    }
  }
}
