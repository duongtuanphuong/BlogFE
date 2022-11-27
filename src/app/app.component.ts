import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './class/user';
import { HomeComponent } from './components/home/home.component';
import { StorageService } from './service/storage.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private roles: string[] = [];
  isLoggedIn = false;
  username !: string;

  user !: User;
  constructor(private storageService:StorageService,private userService: UserService){}

  ngOnInit():void{
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

    })
  }

  title = 'BLog';
}
