import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { CookieService } from '../service/cookie/cookie.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
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
}
