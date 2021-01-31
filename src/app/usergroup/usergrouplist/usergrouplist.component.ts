import { Component, OnInit,ViewChild, Inject,AfterViewInit } from '@angular/core';
import { ApiUserModuleService } from 'src/app/service/api-user-module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {UserGroup}from '../../Models/UserGroup';
import { ApiGroupModuleService } from 'src/app/service/api-group-module.service';

@Component({
  selector: 'app-usergrouplist',
  templateUrl: './usergrouplist.component.html',
  styleUrls: ['./usergrouplist.component.css']
})


export class UsergrouplistComponent   implements OnInit  {
  displayedColumns: string[] = ['index', 'name', 'status', 'action','actionn'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  CompanyList= UserGroup;
  dataSource:any;
  constructor(private _http:ApiGroupModuleService, private _router: Router, private avRoute: ActivatedRoute) {
   }
  ngOnInit(): void {
    
   this.dataSource = new MatTableDataSource();
   this.getUserGroupList();
  }
  getUserGroupList() {  
    this._http.getUserGroupList().subscribe((data) => {
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
