import { Component,OnInit ,Output, EventEmitter,ElementRef } from '@angular/core';
declare var jQuery:any;
import { login } from '../app/Models/Login';
import { ApiUserModuleService } from '../app/service/api-user-module.service';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { companyDatabase } from './Models/CompanyDatabase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'DMSClient';
  elementRef: ElementRef;
  @Output() public sidenavToggle = new EventEmitter();
  login: login;
  companyDatabaseSelected: companyDatabase;
    constructor(private accountService: ApiUserModuleService, lementRef: ElementRef,
      private mScrollbarService: MalihuScrollbarService,) {
        debugger
        this.accountService.loginn.subscribe(x => this.login = x);
        this.accountService.companySelectedData.subscribe(x=>this.companyDatabaseSelected=x);
    }

    ngOnInit() {

      this.mScrollbarService.initScrollbar("#sidebar", { axis: 'y', theme: 'metro',scrollButtons: { enable: true } });
      (function ($) {
        $(document).ready(function () {
          // mcustomscrollbar('#sidebar',{
          //     theme: "minimal"
          // });
  
          $('#dismiss, .overlay').on('click', function () {
              $('#sidebar').removeClass('active');
              $('.overlay').removeClass('active');
          });
  
          $('#sidebarCollapse').on('click', function () {
             // $('#sidebar').addClass('active');
             // $('.overlay').addClass('active');
             // $('.collapse.in').toggleClass('in');
           
              $('#sidebar').toggleClass('active');
            //  $('a[aria-expanded=true]').attr('aria-expanded', 'false');
          });
      });
  
      $(document).ready(function () {
        $('ul.nav > li > a').click(function (e) {
            e.preventDefault();
            $('ul.nav > li > a').removeClass('active');
            $(this).addClass('active');
        });
    });
      })(jQuery);
    }
   
    public onToggleSidenav = () => {
      this.sidenavToggle.emit();
    }
  logout() {
    this.accountService.logout();
}

}
