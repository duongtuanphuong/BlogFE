import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/class/post';
import { User } from 'src/app/class/user';
import { PostService } from 'src/app/service/post.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { ImageComponent } from '../../image/image.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  username !: string;
  user !: User;
  url !: string;
  listImageId: Array<String> = []
  listPost !: any;
  post !: any;
  onUpdate :boolean = false;
  listImage !: any[];


  postForm: any = {
    title: null,
    description: null,
    content: null,
    username: null,
    image_ids: null
  }

  listPostImage: Array<{ id: any; url: any }> = [];


  constructor(private storageService: StorageService, private userService: UserService, private dialog: MatDialog, private postService: PostService, private dialogRef: MatDialogRef<PostComponent>,@Inject(MAT_DIALOG_DATA) private data: any) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.getUser();
      this.getListPost();
    }
    if(this.data != null){
      this.post = this.data.post;
      this.onUpdate = this.data.onUpdate;
      this.postForm.title = this.post.title;
      this.postForm.description = this.post.description;
      this.postForm.content = this.post.content;
      this.postForm.username = this.post.username;
      this.listImage = this.post.images;
      this.listImage.forEach(res =>{
        let image = {id : res.id , url : 'data:image/jpg;base64,' + res.data};
        this.listPostImage.push(image);
        this.listImageId.push(res.id);
      })
      this.postForm.image_ids = this.listImageId;
    }
  }


  getUser(): void {
    this.userService.getCurrentUser(this.username).subscribe(res => {
      this.url = 'data:image/jpg;base64,' + res.avatar;
      this.postForm.username = res.username;
    })
  }

  chooseImage() {
    this.listImageId =[];
    const dialogRef = this.dialog.open(ImageComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.listPostImage = res;
      if (res != null) {
        this.listPostImage.forEach(rc => {
          this.listImageId.push(rc.id);
        })
        this.postForm.image_ids = this.listImageId;
        console.log(this.listImageId);
      }
    })
  }



  getListPost(): void {
    this.postService.getListPost().subscribe(res => {
      this.listPost = res;
    })
  }

  createPost(): void {
    const { title, description, content, username, image_ids } = this.postForm
    if(!this.onUpdate){
      this.postService.createPost(this.postForm).subscribe({
        next: res => {
          this.getListPost();
        }, error: err => {
          console.log(err);
        }
      })
      this.dialogRef.close(this.listPost);
    }
  }

  updatePost(){
    if(this.onUpdate){
      let id = this.post.id;
      this.postService.updatePost(id,this.postForm).subscribe({
        next : res =>{
          this.getListPost();
        },error: err =>{
          console.log(err);
        }
      })
      this.dialogRef.close();
    }
  }




}
