import { Component, OnInit, ViewChild, ElementRef, Inject,SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  Toaster, ToastType } from "ngx-toast-notifications";
import { debounceTime, distinctUntilChanged, map, switchMap, catchError } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import {User}from '../../Models/User';
import {ApiUserModuleService} from '../../service/api-user-module.service';
import { CompanyGroup } from 'src/app/Models/CompanyGroup';

@Component({
  selector: 'app-newcompany',
  templateUrl: './newcompany.component.html',
  styleUrls: ['./newcompany.component.css']
})
export class NewcompanyComponent  implements OnInit {
  form: FormGroup;
  submitted = false;
  actionType: string;
  errorMessage: any;
  constructor(private formBuilder: FormBuilder,private _http:ApiUserModuleService,private avRoute: ActivatedRoute, private router: Router,private toaster: Toaster) {
   debugger
   
    this.actionType = 'Add';
  }

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      companyGroupName: ['', [Validators.required]],
      address: ['', [Validators.required]],     
      city: [''],
      email: [''],
      country:  [''],      
      contactPerson: [''],
      phone:  [''],  
      isActive:  [0],          
      totalUsers:[0],
      expirayDateAD: ['', [Validators.required]],
      isBranchApplicable:  [0],          
      noOfBranch:[0],
      groupCode:['', [Validators.required]],
    });
    debugger
  };
 // get f() { return this.form.controls; }


 saveCompanyGrp() {
    debugger
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.actionType === 'Add') {
      //if add thn
      let companyGrp: CompanyGroup = { 
        companyGroupName: this.form.get("companyGroupName").value,     
        address: this.form.get("address").value,
        city: this.form.get("city").value,      
        country: this.form.get("country").value,
        email: this.form.get("email").value,
        contactPerson: this.form.get("contactPerson").value,                           
        phone: this.form.get("phone").value,   
        isActive: this.form.get("isActive").value,
        totalUsers:Number( this.form.get("totalUsers").value),      
        expirayDateAD: this.endDate,   
        isBranchApplicable: this.form.get("isBranchApplicable").value,      
        noOfBranch:Number( this.form.get("noOfBranch").value),      
        groupCode: this.form.get("groupCode").value, 
       
      };
      debugger
      this._http.saveCompanyGroup(companyGrp).subscribe((data) => {         
       this.showToast();
       this.onReset()      
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
      text: 'User Has been Created',
      caption: 'Company Entry',
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

