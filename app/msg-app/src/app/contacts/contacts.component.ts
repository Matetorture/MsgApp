import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../service/user/user.service';
import { CookieService } from '../service/cookie/cookie.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  constructor(private router: Router) {}

  private userService = inject(UserService);
  private cookieService = inject(CookieService);

  userId: any = this.cookieService.get("userId") === "" ? this.router.navigate(['login']) : this.cookieService.get("userId");

  contacts: Contact[] = [];

  
  ngOnInit(): void {
    this.getContacts();
  }
  
  getContacts(){
    this.userService.getContacts(this.userId).subscribe({
      next: (res: any) => {
        this.contacts = res;
      },
      error:(error) => console.log("Error fech data: "+error)
    });
  }
  
  openContact(id: string){
    this.cookieService.set("contact", id);
    this.router.navigate(['message']);
  }

  newContact: string = "";
  addContact(){
    this.userService.updateContacts(this.userId, this.newContact).subscribe({
      next: (res: any) => {
      },
      error:(error) => console.log("Error fech data: "+error)
    });
    this.newContact = "";
  }
}

interface Contact {
  id: string;
  name: string;
  status?: string;
}