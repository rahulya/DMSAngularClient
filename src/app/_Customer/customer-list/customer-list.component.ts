import { Component, OnInit,ViewChild, Inject,AfterViewInit } from '@angular/core';
import { ApiUserModuleService } from 'src/app/service/api-user-module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {customer} from 'src/app/Models/Customer'
import { apiCustomerModuleService } from 'src/app/service/api-customer-module.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletedialogComponent } from 'src/app/deletedialog/deletedialog.component';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['index', 'FirstName', 'KittaNo', 'CitizenshipNo','View','UploadFile','action','actionn'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  customerList= customer;
  dataSource:any;
  isFileSave:boolean;
  constructor(private _router: Router, private avRoute: ActivatedRoute,
    private _http: apiCustomerModuleService,private dialog: MatDialog,
    private snackBar: MatSnackBar,) {
   }
  ngOnInit(): void {
    
   this.dataSource = new MatTableDataSource();
   this.getCustomerList();
   this.isFileSave=true;
  }
  getCustomerList() {  
    this._http.getCustomerList().subscribe((data) => {
      debugger
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
    });
  }
   ngAfterViewInit() {
   this.getCustomerList();
  }
 
  deleteCustomer(value) {
debugger
    let customerId = value.id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '240px';
    dialogConfig.height = "117px";
    dialogConfig.maxWidth = '96vw';
    dialogConfig.data = {
      message: 'Are you sure want to delete?',
      buttonText: {
        ok: 'Yes',
        cancel: 'No'

      },
    };
  const dialogref = this.dialog.open(DeletedialogComponent, dialogConfig);
    const snack = this.snackBar.open('Snack bar open before dialog');
    dialogref.afterClosed().subscribe((confirmed: boolean) => {
      debugger
      if (confirmed) {
        debugger
        this._http.deleteCustomer(customerId).subscribe((data) => {
          debugger
          this.getCustomerList();
        });
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open('Closing snack bar in a few seconds', 'Fechar', {
          duration: 2000,
        });
      } else {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
      }
    })
  };

}
