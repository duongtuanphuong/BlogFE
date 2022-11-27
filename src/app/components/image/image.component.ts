import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Image } from 'src/app/class/image';
import { User } from 'src/app/class/user';
import { ImageService } from 'src/app/service/image.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements AfterViewInit {

  image !: Image;
  user !: User;
  username !: string;
  isLoggedIn = false;
  progress = 0;
  selectedFiles ?: FileList;
  currentFile ?: File;
  url = './assets/image.jpg';
  listImage !: Image[];

  postImage : any ={
    id : null,
    url : null
  }

  listPostImage : Array<{ id: any; url: any}> = [];


  constructor(private storageService: StorageService,
              private imageService : ImageService,
              private userService: UserService,
              private dialogRef: MatDialogRef<ImageComponent>
              ){

  }
  ngAfterViewInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if(this.isLoggedIn){
      const user =this.storageService.getUser();
      this.username = user.username;
      this.getUser();
      this.getListImageByUser(user.id);
    }



  }


  // ngOnInit(): void {
    
  // }

  getUser(): void {
    this.userService.getCurrentUser(this.username).subscribe( res =>{
      this.user = res;
    })
  }

  selectFile(event: any): void{
    this.selectedFiles = event.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e:any)=>{
      this.url = e.target.result;;
    }
  }



  upload(): void{
    if(this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      if(file){
          this.currentFile = file;
          let id = this.user.id;
          this.imageService.upload(this.currentFile,this.username).subscribe({
            next: res =>{
              this.currentFile = undefined;
              this.getListImageByUser(id);
            },error: err=>{
              console.log(err);
            }
          })
        }
        this.currentFile = undefined;
      }
    }


  getListImageByUser(userId : number):void{
    this.imageService.getListImageByUser(userId).subscribe(res=>{
      this.listImage = res;
    })
  }


  onSubmit(){
    this.listPostImage = [];
    let data = document.querySelectorAll('.choosen img');
    data.forEach(res =>{
      let id = res.getAttribute('id');
      let url = res.getAttribute('src');
      this.postImage = {
        id,url
      };
      this.listPostImage.unshift(this.postImage);
    })
    
    this.dialogRef.close(this.listPostImage);
  }
}


