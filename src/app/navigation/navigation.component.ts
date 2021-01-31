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

     

  
 
}