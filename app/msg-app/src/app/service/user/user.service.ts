import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  constructor() { }

  createUser(){
    // return this.http.post(`${apiUrl}/createUser`);
  }
  getUsers(){
    return this.http.get(`${apiUrl}/getUsers`);
  }
  getUser(userId: string){
    return this.http.get(`${apiUrl}/getUser/${userId}`);
  }
  updateUser(){
    // return this.http.put(`${apiUrl}/updateUser`);
  }

  getContacts(){
    return this.http.get(`${apiUrl}/getContacts`);
  }
  updateContacts(){
    // return this.http.put(`${apiUrl}/updateContacts`);
  }

  loginUser(data: {login: string, password: string}){
    return this.http.post(`${apiUrl}/loginUser`, data);
  }
}
