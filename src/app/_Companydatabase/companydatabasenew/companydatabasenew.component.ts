import { Component, OnInit, ViewChild, ElementRef ,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login } from 'src/app//Models/Login';
import { Observable, pipe } from 'rxjs';
import { ApiGroupModuleService } from 'src/app/service/api-group-module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { companyDatabase } from 'src/app/Models/CompanyDatabase';

import { ApiUserModuleService } from 'src/app/service/api-user-module.service';
@Component({
  selector: 'app-companydatabasenew',
  templateUrl: './companydatabasenew.component.html',
  styleUrls: ['./companydatabasenew.component.css']
})
export class CompanydatabasenewComponent implements OnInit {

  formm: FormGroup;
  submitted = false;
  errorMessage: any;
  actionType: string;
  login: login;
  constructor(private _http: ApiGroupModuleService, private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute, private router: Router,private toaster: Toaster,private accountService:ApiUserModuleService) {
      this.actionType = 'Add';
      this.accountService.loginn.subscribe(x => this.login = x);
     }

  ngOnInit(): void {
    this.formm = this.formBuilder.group({
      companyDatabaseCode: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });

  };

  get f() { return this.formm.controls; }

  CreateCompanyDb() {
    debugger
    this.submitted = true;
    // stop here if form is invalid
    if (this.formm.invalid) {
      return;
    }
    if (this.actionType === 'Add') {
      //if add thn
      let compDb: companyDatabase = {      
        companyDatabaseCode: this.formm.get("companyDatabaseCode").value,
        companyGroupId:this.login.companyGroupId,
        companyName: this.formm.get("companyName").value,
        startDate: this.startDate,
        endDate: this.endDate,

      
          
      };
debugger
      this._http.CreateCompanyDatabase(compDb).subscribe((data) => {  
        debugger
            this.showToast();
       this.onReset()      
     });
    }
  };
  //date
   
startDate:any;
cnStartdate:Date;
onStartDateDateSelect(data){
    
   let year= data.year;
   let month= data.month;
   let day= data.day;
   let newday;
   if(day==1 ||day==2||day==3||day==4||day==5||day==6||day==7||day==8||day==9){
   newday="0"+day;
   }else{
    newday=day;
   }
   debugger
   let std= year+"-"+month+"-"+newday; 
    
   this.startDate = new Date(std);
  }
endDate:any;
onEndDateDateSelect(data){
    
    let year= data.year;
    let month= data.month;
    let day= data.day;
    let newday;
    if(day==1 ||day==2||day==3||day==4||day==5||day==6||day==7||day==8||day==9){
    newday="0"+day;
    }else{
     newday=day;
    }
    debugger
    let newStartdate= year+"-"+month+"-"+newday;
    this.endDate = new Date(newStartdate);
   
   // this.form.controls["endDateAD"].setValue(newStartdate);
   
  }

  //other parts
  private types: Array<ToastType> = ['success', 'danger', 'warning', 'info', 'primary', 'secondary', 'dark', 'light'];
  private text = 'Save Success';
  private onErrorText = 'Error While Saving';
  showToast() {
    const type = this.types[0];
    this.toaster.open({
      position: 'top-right',
      text: 'User Group Has been Save',
      caption: 'User Group Entry',
      duration: 2000,
      type: 'success',
    });
  };
  onReset() {
    this.submitted = false;
    this.formm.reset();
  };

}
