import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/class/user';
import { PostService } from 'src/app/service/post.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { PostComponent } from '../post/post/post.component';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { CommentService } from 'src/app/service/comment.service';
import { PageEvent } from '@angular/material/paginator';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


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

  pageSlice !: any;

  commentForm : any ={
    content : null,
    username : null
  }

  constructor(private dialog: MatDialog,private userService:UserService,private storageService: StorageService,private postService:PostService,private commentService : CommentService){
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
      this.pageSlice = this.listPost.slice(0,3);
    })
  }


  createComment(postId : number){
    this.commentForm.username = this.username;
    const {content,username} = this.commentForm;
    this.commentService.createComment(postId,content,username).subscribe({
      next : res =>{
        console.log(res);
        this.getListPost();
      }, error : err =>{
        console.log(err);
      }
    })
  }

  deleteComment(postId:number,id :number){
    this.commentService.deleteComment(postId,id).subscribe({
      next: res =>{
        this.getListPost();
      },error: err=>{
        console.log(err);
      }
    })
  }

  OnChangePage(event : PageEvent){
      let startIndex = event.pageIndex * event.pageSize;
      let endIndex = startIndex + event.pageSize;
      if(endIndex > this.listPost.length){
        endIndex = this.listPost.length;
      }
      this.pageSlice = this.listPost.slice(startIndex,endIndex);
  }

}
