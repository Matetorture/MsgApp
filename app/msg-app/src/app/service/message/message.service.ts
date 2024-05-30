import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { partition } from 'rxjs';

const apiUrl = `${environment.apiUrl}/message`;

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private http = inject(HttpClient);

  constructor() { }

  // router.post('/createMessage/:apiKey', createMessage);
  createMessage(userId: string, messageInfo: {message: string, chatId: string}){
    return this.http.post(`${apiUrl}/createMessage/${userId}`, messageInfo);
  }

  // router.post('/getMessages/:apiKey', getMessages);
  getMessages(userId: string, chatId: string){
    return this.http.post(`${apiUrl}/getMessages/${userId}`, {chatId: chatId});
  }

  // router.put('/deleteMessage/:apiKey', deleteMessage);
  deleteMessage(){
    // return this.http.post(`${apiUrl}/createMessage`);
  }

  // router.put('/readMessages/:apiKey', readMessages);
  readMessages(){
    // return this.http.post(`${apiUrl}/createMessage`);
  }


  // router.post('/createChat/:apiKey', createChat);
  createChat(userId: string, participants: string[]){
    return this.http.post(`${apiUrl}/createChat/${userId}`, {participants: participants});
  }

  // router.put('/updateChat/:apiKey', updateChat);
  updateChat(userId: string, participants: string[]){
    // return this.http.post(`${apiUrl}/updateChat/${userId}`, participants);
  }
}
