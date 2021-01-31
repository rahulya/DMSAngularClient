import { Component, OnInit,ViewChild, Inject,AfterViewInit } from '@angular/core';
import { ApiUserModuleService } from 'src/app/service/api-user-module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {User}from '../../Models/User';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit  {
  displayedColumns: string[] = ['index', 'userName', 'fullName', 'userGroupName', 'userRoleName','CompanyGroupName','action', 'actionn'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  UserList= User;
  dataSource:any;

  constructor(private _http:ApiUserModuleService, private _router: Router, private avRoute: ActivatedRoute) {
   }
  ngOnInit(): void {
    
   this.dataSource = new MatTableDataSource();
   this.GetUserList();
  }
  GetUserList() {  
    this._http.getUserList().subscribe((data) => {
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


