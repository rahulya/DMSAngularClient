import { Component,OnInit ,Output, EventEmitter,ElementRef } from '@angular/core';
declare var jQuery:any;
import { login } from '../app/Models/Login';
import { ApiUserModuleService } from '../app/service/api-user-module.service';

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
    ) {
        debugger
        this.accountService.loginn.subscribe(x => this.login =x);
        this.accountService.companySelectedData.subscribe(x=>this.companyDatabaseSelected=x);
    }

    ngOnInit() {

      (function () {
        "use strict";
      
        var treeviewMenu = jQuery('.app-menu');
      
        // Toggle Sidebar
        jQuery('[data-toggle="sidebar"]').click(function(event) {
          event.preventDefault();
          jQuery('.app').toggleClass('sidenav-toggled');
        });
      
        // Activate sidebar treeview toggle
        jQuery("[data-toggle='treeview']").click(function(event) {
          event.preventDefault();
          if(!jQuery(this).parent().hasClass('is-expanded')) {
            treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
          }
          jQuery(this).parent().toggleClass('is-expanded');
        });
      
        // Set initial active toggle
        jQuery("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');
      
        //Activate bootstrip tooltips
        jQuery("[data-toggle='tooltip']").tooltip();
      
      })();
      (jQuery);
    }


    onclink(){
      
      jQuery('.app').toggleClass('sidenav-toggled');
    }
   
    
  logout() {
    this.accountService.logout();
}

}
