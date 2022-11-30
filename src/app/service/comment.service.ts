import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const COMMENT_API = "http://localhost:8080/api/post/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  constructor(private http: HttpClient) { }

  
  createComment(postId : number, content : string, username : string):Observable<any>{
    return this.http.post(COMMENT_API + postId + '/comment/create',{content,username},httpOptions);
  }


  deleteComment(postId : number,id : number):Observable<any>{
    return this.http.delete(COMMENT_API + postId + '/comment/delete/' + id,httpOptions)
  }


}
