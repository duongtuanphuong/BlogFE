import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../class/user';

const USER_API = "http://localhost:8080/api/user/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getCurrentUser(username : string):Observable<User>{

    let params = new HttpParams().append('username',username);


    return this.http.get<User>(USER_API + 'currentUser',{params});
  }

  
  updateProfile(id :number,email: string,name : string,country : string,address: string,phone : string):Observable<User>{
    return this.http.put<User>(USER_API +'update/' + id,{email,name,country,address,phone},httpOptions)
  }
  
}
