import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../class/post';

const POST_API = "http://localhost:8080/api/post/"
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http:HttpClient) { }


  getListPost():Observable<any>{
    return this.http.get(POST_API,httpOptions);
  }

  getPost(id : number):Observable<Post>{
    return this.http.get<Post>(POST_API + id,httpOptions);
  }

  createPost(post : Post):Observable<Post>{
    return this.http.post<Post>(POST_API +'create',post,httpOptions);
  }

}
