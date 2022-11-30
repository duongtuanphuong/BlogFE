import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})  
export class AccountComponent implements OnInit {

  loginForm : any = {
    username : null,
    password : null
  }

  registerForm : any = {
    username: null,
    email: null,
    password: null
  }

  isSuccessful = false;
  isSignUpFailed = false;
  
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  errorMessage = '';




  constructor(private authService: AuthService,private storage: StorageService){

  }

  ngOnInit(): void {
  }


  login():void{
    const {username, password} = this.loginForm;
    this.authService.login(username,password).subscribe({
      next: data =>{
        this.storage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storage.getUser().roles;
        this.reloadPage();
      },error: err =>{
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    })
  }

  register():void {
    const {username,email,password} = this.registerForm;
    this.authService.register(username,email,password).subscribe({
      next:data =>{
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.loginForm = {username,password};
        this.login();
      },error : err =>{
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    })
  }


  reloadPage(): void {
    window.location.reload();
  }

}
