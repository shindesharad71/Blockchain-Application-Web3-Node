import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  createAccount() {
    return this.http.get(`${environment.BASE_URL}account`);
  }

  getBalance() {
    const userId = window.localStorage.getItem('userId');
    if (userId) {
      return this.http.get(`${environment.BASE_URL}balance/${userId}`);
    }
    return false;
  }
}
