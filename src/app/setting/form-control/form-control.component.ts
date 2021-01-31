import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { ApiUserModuleService } from 'src/app/service/api-user-module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { apiCustomerModuleService } from 'src/app/service/api-customer-module.service';
import { SelectionModel } from '@angular/cdk/collections';
import { documentright } from 'src/app/Models/DocumentRight';
import {  Toaster, ToastType } from "ngx-toast-notifications";
@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  
  displayedColumns: string[] = ['ControlName', 'ControlValue', 'Mandatoryopt'];


  selection = new SelectionModel<documentright>(true, []);
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    debugger
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  

  selectedArray: Array<any> = [];
  //selectedArray:any[];
  checkControlValue(value, isChecked) {
    debugger
    value.controlVisible = isChecked;
    if (isChecked) {
      debugger
      this.selectedArray.push(value);
    } else {
      let index = this.selectedArray.indexOf(value);
      this.selectedArray.splice(index, 1);
    }
  }

  //selectedArray:any[];
  checkMandatoryopt(value, isChecked) {
    debugger
    value.mandatory = isChecked;
    if (isChecked) {
      debugger
      this.selectedArray.push(value);
    } else {
      let index = this.selectedArray.indexOf(value);
      this.selectedArray.splice(index, 1);
    }
  }

  // masterToggle() {
  //   debugger
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: any;
  isFileSave: boolean;
  constructor(private _router: Router, private avRoute: ActivatedRoute,
    private _http: apiCustomerModuleService,private toaster: Toaster) {
  }
  ngOnInit(): void {
    debugger
    this.dataSource = new MatTableDataSource();

    this.getCustomerList();
    this.isFileSave = true;
  }
  getCustomerList() {
    this._http.getdocumentright().subscribe((data) => {
      debugger
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  SaveDocumentRight(){
    debugger
    this.selectedArray;

    this._http.saveDocumentRight(this.selectedArray).subscribe((data) => { 
      debugger        
     this.showToast();
   //  this.onReset()      
   });
  }

   //other parts
   private types: Array<ToastType> = ['success', 'danger', 'warning', 'info', 'primary', 'secondary', 'dark', 'light'];
   private text = 'Save Success';
   private onErrorText = 'Error While Saving';
   showToast() {
     const type = this.types[0];
     this.toaster.open({
       position: 'top-right',
       text: 'Customer Has been Created',
       caption: 'Customer Entry',
       duration: 2000,
       type: 'success',
     });
   };


}
