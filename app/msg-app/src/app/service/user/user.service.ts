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

  createUser(user: object){
    return this.http.post(`${apiUrl}/createUser`, user);
  }
  getUser(userId: string){
    return this.http.get(`${apiUrl}/getUser/${userId}`);
  }
  getUserById(userId: string){
    return this.http.get(`${apiUrl}/getUserById/${userId}`);
  }
  updateUser(userId: string, user: object){
    return this.http.put(`${apiUrl}/updateUser/${userId}`, user);
  }

  getContacts(userId: string){
    return this.http.get(`${apiUrl}/getContacts/${userId}`);
  }
  updateContacts(userId: string, name: string){
    return this.http.put(`${apiUrl}/updateContacts/${userId}`, {name: name});
  }

  loginUser(data: {login: string, password: string}){
    return this.http.post(`${apiUrl}/loginUser`, data);
  }
}
