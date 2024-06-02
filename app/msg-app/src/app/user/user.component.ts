import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../service/user/user.service';
import { CookieService } from '../service/cookie/cookie.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private router: Router) {}

  private userService = inject(UserService);
  private cookieService = inject(CookieService);

  userId: any = this.cookieService.get("userId") === "" ? this.router.navigate(['login']) : this.cookieService.get("userId");

  user: any = {
    login: "",
    password: "",
    email: "",
    name: "",
    createdAt: ""
  };
  
  ngOnInit(): void {
    this.user = this.getUser();
  }

  getUser(){
    this.userService.getUser(this.userId).subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error:(error) => console.log("Error fech data: "+error)
    });
  }

  updateUser(){
    if(this.user.password == ""){
      this.user.password = undefined;
    }

    this.userService.updateUser(this.userId, this.user).subscribe({
      next: (res: any) => {
      },
      error:(error) => console.log("Error fech data: "+error)
    });
  }
}