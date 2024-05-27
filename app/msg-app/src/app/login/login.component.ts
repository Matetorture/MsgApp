import { Component, inject } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from '../service/cookie/cookie.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private userService = inject(UserService);
  private cookieService = inject(CookieService);

  userId: string = "";

  login = "";
  password = "";

  loginUser(){
    this.userService.loginUser({login: this.login, password: this.password}).subscribe({
      next: (res: any) => {
        this.userId = res.token;
        this.cookieService.set("userId", this.userId);
        // document.cookie = `userId=${this.userId}; expires=${new Date(Date.now() + 1000 * 60 * 60 * 24).toUTCString()}; path=/`;
        console.log(this.userId);
      },
      error:(error) => console.log("Error fech data: "+error)
    });
  }
}
