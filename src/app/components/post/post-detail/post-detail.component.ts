import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/class/post';
import { User } from 'src/app/class/user';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  username !: string;

  user !: User;
  id !: number;
  post !: any;
  commentForm : any ={
    content : null,
    username : null
  }

  constructor(private route : ActivatedRoute,private postService : PostService,private storageService:StorageService,private userService: UserService,private commentService:CommentService){

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isLoggedIn = this.storageService.isLoggedIn();
    if(this.isLoggedIn){
      const user =this.storageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.getUser();
    }
    this.getPost();
  }

  getPost(){
    this.postService.getPost(this.id).subscribe({
      next: res =>{
        this.post = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

  getUser(): void {
    this.userService.getCurrentUser(this.username).subscribe( res =>{
      this.user = res;

    })
  }

  createComment(postId : number){
    this.commentForm.username = this.username;
    const {content,username} = this.commentForm;
    this.commentService.createComment(postId,content,username).subscribe({
      next : res =>{
        console.log(res);
        this.getPost();
      }, error : err =>{
        console.log(err);
      }
    })
  }



}
