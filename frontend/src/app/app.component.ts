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
  constructor(private appService: AppService) {

  }

  ngOnInit() {
    this.checkIfAccountCreated();
  }

  checkIfAccountCreated(): void {
    const userId: string = window.localStorage.getItem('userId');
    if (userId) {
      this.isAccountCreated = true;
    }
  }

  createAccount() {
    this.appService.createAccount().subscribe((res: any) => {
      this.accountDetails = res;
      window.localStorage.setItem('userId', res._id);
      this.checkIfAccountCreated();
    })
  }
}
