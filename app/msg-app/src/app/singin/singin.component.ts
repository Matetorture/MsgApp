import { Component, inject } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from '../service/cookie/cookie.service';

@Component({
  selector: 'app-singin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './singin.component.html',
  styleUrl: './singin.component.css'
})
export class SinginComponent {
  constructor(public router: Router) {}

  private userService = inject(UserService);
  private cookieService = inject(CookieService);

  userId: string = "";

  login = "";
  email = "";
  password = "";

  apiError: string = "";

  createUser(){
    this.userService.createUser({login: this.login, email: this.email, password: this.password}).subscribe({
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
