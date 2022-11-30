import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/class/user';
import { PostService } from 'src/app/service/post.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  username !: string;
  post !: any;
  listPost !: any;

  user !: User;
  constructor(private userService : UserService,private storageService: StorageService,private postService:PostService,private dialog:MatDialog){

  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if(this.isLoggedIn){
      const user =this.storageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.getUser();
    }
  }

  getUser(): void {
    this.userService.getCurrentUser(this.username).subscribe( res =>{
      this.user = res;
      this.getListPostByUser(this.user.id);
    })
  }


  getPost(id : number){
    this.postService.getPost(id).subscribe({
      next: res =>{
        this.post = res;
        const dialogRef = this.dialog.open(PostComponent,{
          data : {post : this.post,onUpdate : true}
        });
        dialogRef.afterClosed().subscribe(data=>{
          this.getListPostByUser(this.user.id);
        })
      },error: err =>{
        console.log(err);
      }
    })
  }



  getListPostByUser(id : number){
    this.postService.getListPostByUser(id).subscribe({
      next : res =>{
        this.listPost = res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  deletePost(id :number){
    this.postService.deletePost(id).subscribe({
      next: res =>{
        this.getUser();
      },error: err =>{
        console.log(err);
      }
    })
  }

}
