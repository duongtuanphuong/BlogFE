import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  postForm: any = {
    title: null,
    description: null,
    content: null,
    username: null,
    image_ids: null
  }

  listPostImage: Array<{ id: any; url: any }> = [];


  constructor(private storageService: StorageService, private userService: UserService, private dialog: MatDialog, private postService: PostService, private dialogRef: MatDialogRef<PostComponent>) {

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

  }


  getUser(): void {
    this.userService.getCurrentUser(this.username).subscribe(res => {
      this.url = 'data:image/jpg;base64,' + res.avatar;
      this.postForm.username = res.username;
    })
  }

  chooseImage() {
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
      }
    })
  }

  createPost(): void {
    const { title, description, content, username, image_ids } = this.postForm
    this.postService.createPost(this.postForm).subscribe({
      next: res => {
        console.log(res);
        this.getListPost();
      }, error: err => {
        console.log(err);
      }
    })
    this.dialogRef.close(this.listPost);
  }

  getListPost(): void {
    this.postService.getListPost().subscribe(res => {
      this.listPost = res;
    })
  }



}
