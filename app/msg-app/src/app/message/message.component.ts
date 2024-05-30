import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../service/user/user.service';
import { MessageService } from '../service/message/message.service';
import { CookieService } from '../service/cookie/cookie.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  constructor(private router: Router) {}

  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private cookieService = inject(CookieService);

  userId: any = this.cookieService.get("userId") === "" ? this.router.navigate(['login']) : this.cookieService.get("userId");

  contact: string = this.cookieService.get("contact");

  contacts: string[] = [];

  chatId: string = "";

  messages: any[] = [];

  user: any = {};

  message: string = "";

  ngOnInit(): void {
    this.contacts.push(this.contact);
    this.createChat();
    this.getUserById();
  }

  createChat(){
    this.messageService.createChat(this.userId, this.contacts).subscribe({
      next: (res: any) => {
        this.chatId = res;
        this.getMessages();
      },
      error:(error) => console.log("Error fech data: "+error)
    });
  }

  getMessages(){
    this.messageService.getMessages(this.userId, this.chatId).subscribe({
      next: (res: any) => {
        this.messages = res;
      },
      error:(error) => console.log("Error fech data: "+error)
    });
  }

  createMessage(message: string){
    this.messageService.createMessage(this.userId, { message: message, chatId: this.chatId}).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error:(error) => console.log("Error fech data: "+error)
    });
  }

  getUserById(){
    this.userService.getUserById(this.contact).subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error:(error) => console.log("Error fech data: "+error)
    });
  }
}