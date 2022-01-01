import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseData } from 'src/app/Model/Auth.model';
import { User } from 'src/app/Model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(email,password):Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.Firebase_API_Key}`,
    {email,password,returnSecureToken: true})
  }
  signup(email,password):Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.Firebase_API_Key}`,
    {email,password,returnSecureToken: true})
  }
  createUser(data:AuthResponseData){
    return new User(data.email,data.idToken,data.localId)
  }
  setUser(data:User){
    localStorage.setItem('user',JSON.stringify(data))
  }
  getUser(){
    let user=localStorage.getItem('user')
    if(user){
      let data= JSON.parse(user)
      return new User(data.email,data.idToken,data.localId)
    }else{
      return null
    }
   
  }
  logout(){
    localStorage.removeItem('user')
  }
}
