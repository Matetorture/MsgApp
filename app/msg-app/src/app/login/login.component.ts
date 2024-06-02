import { Component, inject } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from '../service/cookie/cookie.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(public router: Router) {}

  private userService = inject(UserService);
  private cookieService = inject(CookieService);

  userId: string = "";

  login = "";
  password = "";

  apiError: string = "";

  loginUser(){
    this.userService.loginUser({login: this.login, password: this.password}).subscribe({
      next: (res: any) => {
        this.userId = res.token;
        this.cookieService.set("userId", this.userId);
        this.router.navigate(['contacts']);
      },
      error:(error) => {
        this.apiError = error.error.message;
        console.log("Error fech data: "+error);
      }
    });
  }
}
