import { Component, OnInit,ViewChild, Inject,AfterViewInit } from '@angular/core';
import { ApiUserModuleService } from 'src/app/service/api-user-module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {User}from '../../Models/User';
import{CompanyGroup} from '../../Models/CompanyGroup';

@Component({
  selector: 'app-listcompany',
  templateUrl: './listcompany.component.html',
  styleUrls: ['./listcompany.component.css']
})


export class ListcompanyComponent  implements OnInit  {
  displayedColumns: string[] = ['index', 'companyName', 'address', 'city', 'endDateAD'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  CompanyList= CompanyGroup;
  dataSource:any;

  constructor(private _http:ApiUserModuleService, private _router: Router, private avRoute: ActivatedRoute) {
   }
  ngOnInit(): void {
    
   this.dataSource = new MatTableDataSource();
   this.GetCompanyList();
  }
  GetCompanyList() {  
    this._http.getCompanyGroupList().subscribe((data) => {
      debugger
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
    });
  }
   ngAfterViewInit() {
  //   this.GetUserList();
  }
  deleteUser=function(){
    
  }

}
