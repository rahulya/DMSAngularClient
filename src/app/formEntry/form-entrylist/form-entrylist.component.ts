import { Component, OnInit,ViewChild, Inject,AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {formEntry}from '../../Models/FormEntry';
import { apiCustomerModuleService } from 'src/app/service/api-customer-module.service';

@Component({
  selector: 'app-form-entrylist',
  templateUrl: './form-entrylist.component.html',
  styleUrls: ['./form-entrylist.component.css']
})
export class FormEntrylistComponent implements OnInit {
  
  displayedColumns: string[] = ['index', 'Entrymodule', 'FieldName', 'FieldType', 'TotalWidth','Mandotaryopt','DateFormat','Edit','Delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  FormEntryList= formEntry;
  dataSource:any;

  constructor(private _http:apiCustomerModuleService, private _router: Router, private avRoute: ActivatedRoute) {
   }
  ngOnInit(): void {
    
   this.dataSource = new MatTableDataSource();
   this.GetFormEntryList();
  }
  GetFormEntryList() {  
    this._http.GetFormEntryList().subscribe((data) => {
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
