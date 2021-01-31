import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { companyDatabaseViewModel, parameterOne } from 'src/app/ViewModels/CompanyDatabseViewModel';
import { ApiGroupModuleService } from 'src/app/service/api-group-module.service';
import { ApiUserModuleService } from 'src/app/service/api-user-module.service';
import { login } from 'src/app/Models/Login';
import { apiCustomerModuleService } from 'src/app/service/api-customer-module.service';

@Component({
  selector: 'app-companydatabaselist',
  templateUrl: './companydatabaselist.component.html',
  styleUrls: ['./companydatabaselist.component.css']
})


export class CompanydatabaselistComponent implements OnInit {
  displayedColumns: string[] = ['index', 'companyName', 'startDate', 'endDate',];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  CompanyListViewModel = companyDatabaseViewModel;
  dataSource: any;
  login: login;

  constructor(private _http: ApiGroupModuleService, private _Newhttp: apiCustomerModuleService, private _router: Router, private avRoute: ActivatedRoute, private accountService: ApiUserModuleService) {
    this.accountService.loginn.subscribe(x => this.login = x);
  }
  ngOnInit(): void {
    debugger
    this.dataSource = new MatTableDataSource();
    let userId = this.login.userId;
    let companyGroupId = this.login.companyGroupId;

    let ParameterOne: parameterOne = {
      userId: userId,
      companyGroupId: companyGroupId,

    };

    this.getUserWiseCompanyDbList(ParameterOne);

  }
  getUserWiseCompanyDbList(ParameterOne) {
    this._http.getUserWiseCompanyDbList(ParameterOne).subscribe((data) => {
      debugger
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }
  ngAfterViewInit() {
    //   this.GetUserList();
  }


  NewData = [];
  doubleClick(value, index) {
    debugger
    
    this.accountService.FnCompanyDatabaseSelcted(value);


      this._Newhttp.SetDatabaseName(value.companyDatabaseCode).subscribe((data) => {
        debugger
      });
    
    this._router.navigate(['home-dashboard']);
    // this.dialogRef.close({ data: value });
  }



}