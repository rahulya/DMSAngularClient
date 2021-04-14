import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toaster, ToastType } from "ngx-toast-notifications";
import { login } from "../Models/Login";
import { ApiUserModuleService } from '../service/api-user-module.service';

declare var jQuery: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  returnUrl: string;
  loading = false;
  constructor(
    private _http: ApiUserModuleService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router,
    private toaster: Toaster
    )
     {}

  ngOnInit() {

    this.form = this.formBuilder.group({
      companyCode: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      

    });
    (function ($) {
      $(document).ready(function () {
        $('.login-info-box').fadeOut();
        $('.login-show').addClass('show-log-panel');
      });
      $(document).ready(function () {
        $('.login-reg-panel input[type="radio"]').on('change', function () {
          if ($('#log-login-show').is(':checked')) {
            $('.register-info-box').fadeOut();
            $('.login-info-box').fadeIn();

            $('.white-panel').addClass('right-log');
            $('.register-show').addClass('show-log-panel');
            $('.login-show').removeClass('show-log-panel');

          }
          else if ($('#log-reg-show').is(':checked')) {
            $('.register-info-box').fadeIn();
            $('.login-info-box').fadeOut();

            $('.white-panel').removeClass('right-log');

            $('.login-show').addClass('show-log-panel');
            $('.register-show').removeClass('show-log-panel');
          }
        });
      });
    })(jQuery);

    this.returnUrl = this.avRoute.snapshot.queryParams['returnUrl'] || '/';
  };
  Login() {
    debugger
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    let logins: login = {
      companyCode:"H001",
      userName:"Rahul",
      password: "123",

    };
    debugger
    const returnUrl = this.avRoute.snapshot.queryParams['returnUrl'] || '/';
     this.router.navigateByUrl(returnUrl);
    
    this._http.loginIn(logins).subscribe((data) => {
      debugger
     if(data !=null){
      this.showToast();
    
     const returnUrl = this.avRoute.snapshot.queryParams['returnUrl'] || '/';
     this.router.navigateByUrl(returnUrl);
     }else{
      this.showToastError();
     
      this.loading = false;
     }
     

    });
  };


  //other parts
  private types: Array<ToastType> = ['success', 'danger', 'warning', 'info', 'primary', 'secondary', 'dark', 'light'];
  private text = 'Save Success';
  private onErrorText = 'Error While Saving';
  showToast() {
    const type = this.types[0];
    this.toaster.open({
      position: 'top-right',
      text: 'Login successful',
      caption: 'Document MS',
      duration: 2000,
      type: 'success',
    });
  };
  showToastError() {
    const type = this.types[2];
    this.toaster.open({
      position: 'top-right',
      text: 'Login Failed',
      caption: 'Document MS',
      duration: 2000,
      type: 'success',
    });
  };
}
