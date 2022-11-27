import { Component,Input,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  username !: string;


  @Input() user !: User;

  constructor(private dialog: MatDialog,private storageService:StorageService,private authService:AuthService){

  }

  ngOnInit(): void {
  }

  openAccountForm():void{
    this.dialog.open(AccountComponent);
  }
  
  logout():void{
    this.authService.logout().subscribe({
      next:res =>{
        console.log(res);
        this.storageService.clean();
        window.location.reload();
      },error: err=>{
        console.log(err);
      }
    })
  }

}
