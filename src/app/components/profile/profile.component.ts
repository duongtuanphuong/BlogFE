import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/class/user';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  username !: string;

  user !: User;

  updateForm : any ={
    email : null,
    name : null,
    country : null,
    address : null,
    phone : null
  }

  constructor(private userService : UserService,private storageService: StorageService,private http:HttpClient,private dialog : MatDialog){
    
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
      this.updateForm.email = res.email;
      this.updateForm.name = res.name;
      this.updateForm.country = res.country;
      this.updateForm.address = res.address;
      this.updateForm.phone = res.phone;
    })
  }

  updateProfile(){
    const {email,name,country,address,phone} = this.updateForm;
    this.userService.updateProfile(this.user.id,email,name,country,address,phone).subscribe({
      next : res =>{
        this.getUser();
      },error: err=>{
        console.log(err);
      }
    })
  }

  getCountry(){
    this.http.get('https://restcountries.com/v3.1/all').subscribe(res =>{
      console.log(res);
    });
  }

  onChangeImage(){
    const dialogRef = this.dialog.open(ImageComponent,{
      width: '800px' 
    });

    dialogRef.afterClosed().subscribe(res =>{

    })

  }

}
