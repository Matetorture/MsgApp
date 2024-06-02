import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { UserService } from '../service/user/user.service';
import { CookieService } from '../service/cookie/cookie.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private router: Router) {}

  private userService = inject(UserService);
  private cookieService = inject(CookieService);

  userId: any = this.cookieService.get("userId");

  logout(){
    this.cookieService.set("userId", "");
    this.userId = this.cookieService.get("userId");
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    if(this.cookieService.get("theme") == ""){
      this.cookieService.set("theme", "dark");
    }
    if(this.cookieService.get("theme") == "dark"){
      this.changeThemeMode();
    }

    setInterval(() => {
      if(this.userId != '' && document.visibilityState === 'visible'){
        this.changeToOnline();
      }else{
        this.userId = this.cookieService.get("userId");
      }
    }, 5000);
  }

  isDarkTheme: boolean = false;

  changeThemeMode() {
    document.body.classList.toggle('dark');
    this.isDarkTheme = !this.isDarkTheme;
    if(this.isDarkTheme){
      this.cookieService.set("theme", "dark");
    }else{
      this.cookieService.set("theme", "light");
    }
  }

  changeToOnline(){
    this.userService.changeToOnline(this.userId).subscribe({
      next: (res: any) => {
      },
      error:(error) => console.log("Error fech data: "+error)
    });
  }
}
