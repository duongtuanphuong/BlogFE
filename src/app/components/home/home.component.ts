import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { PostService } from 'src/app/service/post.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { ImageComponent } from '../image/image.component';
import { PostComponent } from '../post/post/post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  private roles: string[] = [];
  isLoggedIn = false;
  username !: string;
  user !: User;
  url !: string;
  listPost !: any;

  constructor(private dialog: MatDialog,private userService:UserService,private storageService: StorageService,private postService:PostService){
  }


  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if(this.isLoggedIn){
      const user =this.storageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.getUser();
    }
    this.getListPost();
  }

  createPost():void{
     const dialogRef = this.dialog.open(PostComponent);

     dialogRef.afterClosed().subscribe(res =>{
        if(res !=null){
          this.listPost = res;
          this.getListPost();
        }
     })

  }


  getUser(): void {
    this.userService.getCurrentUser(this.username).subscribe( res =>{
      this.user = res;
      this.url = 'data:image/jpg;base64,' + res.avatar;
    })
  }

  getListPost(): void {
    this.postService.getListPost().subscribe(res => {
      this.listPost = res;
    })
  }

  test(){
    console.log(this.listPost);
  }

}
