import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../class/image';


const UPLOAD_API = "http://localhost:8080/api/upload-file/"
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
};
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http : HttpClient) { }

  upload(file:File,username : string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file',file);
    return this.http.post<any>(UPLOAD_API + username,formData); 
  }


  getListImageByUser(userId : number): Observable<Image[]>{
    const params = new HttpParams().append('userId',userId);
    return this.http.get<Image[]>('http://localhost:8080/api/image/getImageByUser',{params});
  }

}
