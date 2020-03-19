import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAccountCreated = false;
  accountDetails: any;
  accountBalance = 0;
  constructor(private appService: AppService) {

  }

  ngOnInit() {
    this.checkIfAccountCreated();
  }

  checkIfAccountCreated(): void {
    const userId: string = window.localStorage.getItem('userId');
    if (userId) {
      this.isAccountCreated = true;
      this.getUserById();
    } else {
      this.isAccountCreated = false;
    }
  }

  createAccount() {
    this.appService.createAccount().subscribe((res: any) => {
      this.accountDetails = res;
      window.localStorage.setItem('userId', res._id);
      this.checkIfAccountCreated();
    });
  }

  getUserById() {
    this.appService.getUserById().subscribe((res: any) => {
      this.accountDetails = res;
      this.getAccountBalance();
    });
  }

  getAccountBalance() {
    this.appService.getBalance().subscribe((res: any) => {
      if (res.balance) {
        this.accountBalance = res.balance;
      }
    });
  }

  clear() {
    window.localStorage.clear();
    this.checkIfAccountCreated();
  }
}
