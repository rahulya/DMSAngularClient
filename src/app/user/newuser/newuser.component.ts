import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toaster, ToastType } from "ngx-toast-notifications";
import { debounceTime, distinctUntilChanged, map, switchMap, catchError } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { User } from '../../Models/User';
import { ApiUserModuleService } from '../../service/api-user-module.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  actionType: string;
  errorMessage: any;
  username: string;
  constructor(private formBuilder: FormBuilder, private _http: ApiUserModuleService, private avRoute: ActivatedRoute, private router: Router, private toaster: Toaster) {
    debugger

    this.actionType = 'Add';
    this.username = "USER";
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: [null],
      lastName: [''],
      password: [''],
      confirmpassword: [''],
      userGroupID: ['', [Validators.required]],
      userRoleID: ['', [Validators.required]],
      companyGroupID:[''],

    });
    debugger
  };
  // get f() { return this.form.controls; }

  saveUser() {
    debugger

    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    if (this.actionType === 'Add') {
      //if add thn
      let userss: User = {
        firstName: this.form.get("firstName").value,
        middleName: this.form.get("middleName").value,
        lastName: this.form.get("lastName").value,
        userName: this.form.get("userName").value,
        password: this.form.get("password").value,
        userGroupID:this.UsergroupCodeSelectedCodeList[0].id,
        userRoleID:Number( this.form.get("userRoleID").value),
        companyGroupID: this.selectedCompanyID,
      };
      debugger
      this._http.saveUser(userss).subscribe((data) => {
        debugger
        this.showToast();
        this.onReset()
      });
    }
  };

  //autoo
  groupCodeModel: any;
  formatter = (result: string) => result.toLowerCase();


  AutocompleteUserGroup = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term =>
        this.getUserGroupCodeAuto(term)),
      distinctUntilChanged(),
    )

  UsergroupCodeSelectedCodeList: any;
  getUserGroupCodeAuto(term: string) {
    
    if (term.length < 2) {
      return this._http.getProGrpAutocomplete('')
        .pipe(map(test => test.map(a =>
          a.name).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)));
    } else {
      return this._http.getProGrpAutocomplete(term)



        .pipe(map(test => {
          debugger
          this.UsergroupCodeSelectedCodeList = test;
          return test.map(a => a.name).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);


        }));
      // .pipe(map(test => test.map(a => a.groupCode).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)));
    }
  }
  selectUserGrp($event) {
    debugger

    if ($event != '') {

      // this.groupCodeModel=event;
      // this.changeGroupAuto($event.item)
    } else {
      return

    }
  }

  //company group
  
  //autoo
  groupCodeModel: any;
  formatterr = (result: string) => result.toLowerCase();


  AutocompleteCompGroup = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term =>
        this.getcompleteCompGroup(term)),
      distinctUntilChanged(),
    )

    ComgroupCodeSelectedCodeList: any;
  getcompleteCompGroup(term: string) {
    
    if (term.length < 2) {
      return this._http.getCompanyGroupAutocomplete('')
        .pipe(map(test => test.map(a =>
          a.companyGroupName).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)));
    } else {
      return this._http.getCompanyGroupAutocomplete(term)

        .pipe(map(test => {
          
          this.ComgroupCodeSelectedCodeList = test;
          return test.map(a => a.companyGroupName).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);


        }));
      // .pipe(map(test => test.map(a => a.groupCode).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)));
    }
  }
  selectedCompanyID:number;
  selectCompGrp($event) {
    debugger

    if ($event != '') {
      let iid;
       this.ComgroupCodeSelectedCodeList.forEach(function(item){  
       if (item.companyGroupName==$event.item)
       {
         debugger
         iid =item.id;
       }
      }); 
      debugger
      this.selectedCompanyID=iid;

    } else {
      return

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
      text: 'User Has been Created',
      caption: 'User Entry',
      duration: 2000,
      type: 'success',
    });
  };

  onReset() {
    this.submitted = false;
    this.form.reset();
  };


}
