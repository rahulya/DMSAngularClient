import { Component, OnInit, ViewChild, ElementRef, Inject,SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  Toaster, ToastType } from "ngx-toast-notifications";
import { debounceTime, distinctUntilChanged, map, switchMap, catchError } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import {customer}from '../../Models/Customer';
import {ApiUserModuleService} from '../../service/api-user-module.service';
import { CompanyGroup } from 'src/app/Models/CompanyGroup';
import { apiCustomerModuleService } from 'src/app/service/api-customer-module.service';
import { companyDatabase } from '../../Models/CompanyDatabase';
import { companyDatabaseViewModel } from 'src/app/ViewModels/CompanyDatabseViewModel';
import { customerViewModel } from 'src/app/ViewModels/CustomerViewModel';
import {formEntry} from 'src/app/Models/FormEntry';

@Component({
  selector: 'app-formEntryform-entryadd',
  templateUrl: './form-entryadd.component.html',
  styleUrls: ['./form-entryadd.component.css']
})
export class FormEntryaddComponent implements OnInit {
  
  form: FormGroup;
  submitted = false;
  actionType: string;
  errorMessage: any;
  companyDatabaseSelected: companyDatabase;
  customerId: number;
  existingCustomer: customerViewModel;
  constructor(private accountService: ApiUserModuleService,private formBuilder: FormBuilder,
    private _http:apiCustomerModuleService,private avRoute: ActivatedRoute, private router: Router,
    private toaster: Toaster) {
   
 
    this.actionType = 'Add';
    this.accountService.companySelectedData.subscribe(x=>this.companyDatabaseSelected=x);


    var id = this.avRoute.snapshot.paramMap.get('id');
    if (id) {
      this.customerId = Number(id);
      this.actionType="Update";
    }
  }
  fieldType:string;
  ngOnInit(): void {
    this.fieldType="0";
    this.form = this.formBuilder.group({
      entrymodule: [''],
      fieldName:['', [Validators.required]],  
      fieldType: ['', [Validators.required]], 
      totalWidth:['', [Validators.required]], 
      mandotaryopt: ['', [Validators.required]],     
      
            
    });
    //get data for update
    if( this.customerId >0){
      debugger
      this.actionType="Update";
      this._http.GetUpdateCustomerData(this.customerId).subscribe((data) => {

        debugger

        if (data != null) {
          this.existingCustomer = data[0];
          debugger
          this.form.controls["firstName"].setValue(this.existingCustomer.firstName)
          this.form.controls["middle"].setValue(this.existingCustomer.middle)
          this.form.controls["lastName"].setValue(this.existingCustomer.lastName)
          this.form.controls["kittaNo"].setValue(this.existingCustomer.kittaNo)


          this.form.controls["citizenshipNo"].setValue(this.existingCustomer.citizenshipNo)
          this.form.controls["address"].setValue(this.existingCustomer.address)
          this.form.controls["phoneNo"].setValue(this.existingCustomer.phoneNo)
          this.form.controls["fatherName"].setValue(this.existingCustomer.fatherName)


          this.form.controls["grandFatherName"].setValue(this.existingCustomer.grandFatherName)
          this.form.controls["emailAddress"].setValue(this.existingCustomer.emailAddress)
          this.form.controls["mobileNo"].setValue(this.existingCustomer.mobileNo)
          this.form.controls["fatherName"].setValue(this.existingCustomer.fatherName)
         
        }
      })
//
    }
  
  };
 // get f() { return this.form.controls; }
 FormEntrySave() {
    debugger
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.actionType === 'Add') {
      //if add thn
      let form: formEntry = { 
        entrymodule:"Customrt Master",     
        fieldName: this.form.get("fieldName").value,
        fieldType: this.form.get("fieldType").value,      
        totalWidth: this.form.get("totalWidth").value,
        mandotaryopt:this.form.get("mandotaryopt").value,
        //dateFormat: this.form.get("dateFormat").value,   
      
      };
      debugger
      this._http.saveFormEntryData(form).subscribe((data) => { 
        debugger        
       this.showToast();
       this.onReset()      
     });
    }else{

      let customer: customerViewModel = { 
        id:this.customerId,
        firstName: this.form.get("firstName").value,     
        middle: this.form.get("middle").value,
        lastName: this.form.get("lastName").value,      
        kittaNo: this.form.get("kittaNo").value,
        citizenshipNo:this.form.get("citizenshipNo").value,
        address: this.form.get("address").value,   
        phoneNo: this.form.get("phoneNo").value,
        fatherName: this.form.get("fatherName").value,      
        grandFatherName: this.form.get("grandFatherName").value,    
        emailAddress: this.form.get("emailAddress").value,      
        mobileNo:this.form.get("mobileNo").value,  
      
      };

      debugger
      this._http.UpdateCustomerData(customer).subscribe((data) => { 
        debugger        
       this.showToastUpdate();
       this.router.navigate(['route-customerlist'])
     });

    }
  };
  
  
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
  
startDate:any;
cnStartdate:Date;
  onStartDateSelect(data){
    debugger
   let year= data.year;
   let month= data.month;
   let day= data.day;
   let newday;
   if(day==1 ||day==2||day==3||day==4||day==5||day==6||day==7||day==8||day==9){
   newday="0"+day;
   }else{
    newday=day;
   }
   let std= year+"-"+month+"-"+newday; 
    
   this.startDate = new Date(std);
  }
endDate:any;
  onEndDateSelect(data){
    debugger
    let year= data.year;
    let month= data.month;
    let day= data.day;
    let newday;
    if(day==1 ||day==2||day==3||day==4||day==5||day==6||day==7||day==8||day==9){
    newday="0"+day;
    }else{
     newday=day;
    }
    let newStartdate= year+"-"+month+"-"+newday;
    this.endDate = new Date(newStartdate);
   
   // this.form.controls["endDateAD"].setValue(newStartdate);
   
  }


}

