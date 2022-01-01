import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Posts } from 'src/app/Model/post.model';
import { updatePost } from 'src/app/Reducer/action';
import { updatePostById } from 'src/app/Reducer/selector';
import { AppState } from 'src/app/Reducer/state';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  post:Posts
  formGroup:FormGroup;
  id: string;

  constructor(private fb:FormBuilder,private PostService:PostService,private store:Store<AppState>,
    private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    //  this.store.select(updatePostById).subscribe((data) =>{
    //    console.log(data)
    //    if(data){
    //     this.post=data;
    //     this.formGroup.patchValue({
    //       title:this.post.title,
    //       description:this.post.description
    //     })
    //    }
       
    //  })
    this.id = this.ActivatedRoute.snapshot.params['id'];
    this.PostService.entities$.subscribe((posts) => {
      if (posts.length) {
        this.post = posts.find((post) => post.id == parseInt(this.id));
        this.formGroup.patchValue({
          title: this.post.title,
          description: this.post.description,
          id:this.post.id
        });
      }
    });
    
    
  }
  createForm(){
    this.formGroup=this.fb.group({
      title:['',[Validators.required,Validators.minLength(6)]],
      description:['',[Validators.required,Validators.minLength(6)]]
    })
  }
  updatePost(){
   
    let post:Posts={
      id:this.post.id,
      title:this.formGroup.value.title,
      description:this.formGroup.value.description
    }
    // this.store.dispatch(updatePost( {post} ))
    this.PostService.update(post);
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
