import { Component, OnInit, ViewChild, ElementRef, Inject, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toaster, ToastType } from "ngx-toast-notifications";
import { debounceTime, distinctUntilChanged, map, switchMap, catchError } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { customer } from '../../Models/Customer';
import { ApiUserModuleService } from '../../service/api-user-module.service';
import { CompanyGroup } from 'src/app/Models/CompanyGroup';
import { formEntry } from 'src/app/Models/FormEntry';
import { apiCustomerModuleService } from 'src/app/service/api-customer-module.service';
import { customerDocumentUdf } from 'src/app/Models/CustomerDocumentUdf';

@Component({
  selector: 'app-customer-document-upload-create',
  templateUrl: './customer-document-upload-create.component.html',
  styleUrls: ['./customer-document-upload-create.component.css']
})
export class CustomerDocumentUploadCreateComponent implements OnInit {
  actionType: string;
  form: FormGroup;
  submitted = false;
  errorMessage: any;
  FormEntryList: any;
   selectedFiles:Array<FileList>;
  fileInfos: Observable<any>;
  customerID:number;
  constructor(private _http: apiCustomerModuleService, private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute, private router: Router,
    private toaster: Toaster) {

      var id = this.avRoute.snapshot.paramMap.get('id');
   
      if (id) {
        this.customerID = Number(id);
        
      //  this.actionType = 'Insert';
      }
    this.actionType = "Insert";
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      customerId: [''],
      documentFile: new FormControl(''),
    });
    this.GetFormEntryList();
    this.FormEntryList;
  }

  GetFormEntryList() {
    this._http.GetFormEntryList().subscribe((data) => {
      debugger
      this.FormEntryList = data;

    });
  }
  progressInfos = [];
  SaveDocumentUpload() {
    debugger
 
    const formData: FormData = new FormData();

    

debugger

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.actionType === 'Insert') {
      //if add thn
      let customerDoc: customerDocumentUdf = {
       // formId: 1,
        //documentFile: this.form.get('documentFile').value,
        customerId:  this.customerID ,
        actionType: this.actionType
      };
      debugger
      
      for (var i = 0; i < this.myFiles.length; i++) { 

        debugger
        formData.append("documentFile", this.myFiles[i]);
        formData.append("formId", this.myFormId[i].toString());

        
      }
      
      //formData.append('formId', customerDoc.formId.toString());
      formData.append('actionType', customerDoc.actionType.toString());
      // formData.append('documentFile', customerDoc.documentFile, customerDoc.documentFile.name);
      formData.append('customerId', customerDoc.customerId.toString());



      debugger
      this._http.saveCustomerDocumentDataUdf(formData).subscribe((data) => {
        debugger
        this.showToast();
        this.onReset()
      });
    }
  };



  // ondocumentDocFileChange(event, index) {
  //   debugger
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     debugger
  //     this.form.patchValue({

  //       documentFile: file
  //     });
  //   }
  // }
  // array:[];
  // ondocumentDocFileChange(event,index) {
  //   debugger

  //   var obj={
  //     data:'',
  //   };
  //   obj.data=event.target.files[0];
  //   this.selectedFiles.push(obj);
  
  // }
  myFiles:string [] = [];
  myFormId:Int32Array [] = [];
  ondocumentDocFileChange (e,formId) {
    debugger
   
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
      this.myFormId.push(formId);
    }
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

  showToastUpdate() {
    const type = this.types[0];
    this.toaster.open({
      position: 'top-right',
      text: 'Customer Has been Update',
      caption: 'Customer Entry',
      duration: 2000,
      type: 'success',
    });
  };

  onReset() {
    this.submitted = false;
    this.form.reset();
  };

}
