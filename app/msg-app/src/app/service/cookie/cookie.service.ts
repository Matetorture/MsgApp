import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  set(name: string, value: string){
    document.cookie = `${name}=${value}; expires=${new Date(Date.now() + 1000 * 60 * 60 * 24).toUTCString()}; path=/`;
  }
  get(name: string): string{
    return document.cookie.split('; ')
    .find(row => row.startsWith(`${name}=`))?.split("=")[1] ?? "";
  }
}
