import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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

  private cookieService = inject(CookieService);

  logout(){
    this.cookieService.set("userId", "");
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    if(this.cookieService.get("theme") == ""){
      this.cookieService.set("theme", "dark");
    }
    if(this.cookieService.get("theme") == "dark"){
      this.changeThemeMode();
    }
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
}
