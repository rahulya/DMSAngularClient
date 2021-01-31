import { Component, OnInit, ViewChild, ElementRef ,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserGroup} from '../../Models/UserGroup';
import { Observable, pipe } from 'rxjs';
import { ApiGroupModuleService } from 'src/app/service/api-group-module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: 'app-usergroupadd',
  templateUrl: './usergroupadd.component.html',
  styleUrls: ['./usergroupadd.component.css']
})
export class UsergroupaddComponent implements OnInit {

  formm: FormGroup;
  submitted = false;
  errorMessage: any;
  actionType: string;
  
  constructor(private _http: ApiGroupModuleService, private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute, private router: Router,private toaster: Toaster) {
      this.actionType = 'Add';
     }

  ngOnInit(): void {
    this.formm = this.formBuilder.group({
      name: ['', [Validators.required]],
      isActive: [0, [Validators.required]],
    
     
    });

  };

  get f() { return this.formm.controls; }

  saveGroup() {
    debugger
    this.submitted = true;
    // stop here if form is invalid
    if (this.formm.invalid) {
      return;
    }
    if (this.actionType === 'Add') {
      //if add thn
      let grp: UserGroup = {      
        name: this.formm.get("name").value,
        isActive: this.formm.get("isActive").value,
          
      };

      this._http.saveUserGroup(grp).subscribe((data) => {  
        debugger
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
