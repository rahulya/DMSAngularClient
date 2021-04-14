import { Component, OnInit } from '@angular/core';
import { ApiUserModuleService } from '../service/api-user-module.service';
import { login } from '../Models/Login';
import { companyDatabase } from '../Models/CompanyDatabase';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  login: login;
  companyDatabaseSelected: companyDatabase;
  constructor(private accountService: ApiUserModuleService) {
      debugger
      this.accountService.loginn.subscribe(x => this.login = x);
     // this.accountService.companySelectedData.subscribe(x=>this.companyDatabaseSelected=x);
  }


  ngOnInit(): void {
    this.login;
  }

}
