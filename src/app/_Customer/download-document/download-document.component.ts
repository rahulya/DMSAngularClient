import { Component, OnInit } from '@angular/core';
import { apiCustomerModuleService } from 'src/app/service/api-customer-module.service';
declare var require: any
const FileSaver = require('file-saver');
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-download-document',
  templateUrl: './download-document.component.html',
  styleUrls: ['./download-document.component.css']
})
export class DownloadDocumentComponent implements OnInit {
  //viewer = 'google';  
  //selectedType = 'txt';   
  //DemoDoc="https://www.le.ac.uk/oerresources/bdra/html/resources/example.txt" 

  customerID: number;
  customerDocByCustomerId:any;
  constructor(private _http: apiCustomerModuleService, private avRoute: ActivatedRoute,private router:Router) {

    var id = this.avRoute.snapshot.paramMap.get('id');
debugger
    if (id) {
      this.customerID = Number(id);
     this. getCustomerDocByCustomerID( this.customerID)
    }

  }


  ngOnInit(): void {
    this.customerDocByCustomerId;
    this.GetFormEntryList();
  }


  getCustomerDocByCustomerID(customer: number) {
    debugger
    this._http.GetCustomerDocByCustomerID(customer).subscribe((data) => {
      debugger
      this.customerDocByCustomerId=data[0];
    });

  };

  // downloadDocFile(DocFile) {
  //   debugger
  //   if(DocFile ==""){
  //     return
  //   }
   
  //   this._http.DownloadCustomerFile(DocFile).subscribe((data) => {
      
  //     FileSaver(data, DocFile)
  //   });
  // }
  pathUrl:String;
  viewDocFile(DocFile) {
    debugger
    if(DocFile ==""){
      return
    }
    this._http.GetUploadFileViewByCustomerID(DocFile).subscribe((data) => {
      debugger
      this.pathUrl=data.urlPath;

      this.router.navigate(['/route-viewDocument', this.pathUrl])
     
    });
  }
  FormEntryList: any;
  GetFormEntryList() {
    this._http.GetFormEntryList().subscribe((data) => {
      debugger
      this.FormEntryList = data;

    });
  }

  
}


