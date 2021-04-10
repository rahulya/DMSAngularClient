import { Component, OnInit, Output, EventEmitter,ElementRef } from '@angular/core';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
declare var jQuery:any;
import { login } from '../Models/Login';
import { ApiUserModuleService } from '../service/api-user-module.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  elementRef: ElementRef;
  @Output() public sidenavToggle = new EventEmitter();
 
  login: login;

  
  constructor(
    private accountService: ApiUserModuleService,
    lementRef: ElementRef,
    private mScrollbarService: MalihuScrollbarService,
  ) {
    this.elementRef = lementRef;
  }



  ngOnInit() {

    this.mScrollbarService.initScrollbar("#sidebar", { axis: 'y', theme: 'metro',scrollButtons: { enable: true } });
    (function ($) {
      
      (function () {
        "use strict";
      
        var treeviewMenu = $('.app-menu');
      
        // Toggle Sidebar
        $('[data-toggle="sidebar"]').click(function(event) {
          event.preventDefault();
          $('.app').toggleClass('sidenav-toggled');
        });
      
        // Activate sidebar treeview toggle
        $("[data-toggle='treeview']").click(function(event) {
          event.preventDefault();
          if(!$(this).parent().hasClass('is-expanded')) {
            treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
          }
          $(this).parent().toggleClass('is-expanded');
        });
      
        // Set initial active toggle
        $("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');
      
        //Activate bootstrip tooltips
        $("[data-toggle='tooltip']").tooltip();
      
      })();
      
   
    })(jQuery);
  }
 
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

     

  
 
}