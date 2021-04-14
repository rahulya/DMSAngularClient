import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { UsergrouplistComponent } from './usergroup/usergrouplist/usergrouplist.component';
import { UsergroupaddComponent } from './usergroup/usergroupadd/usergroupadd.component';
import { UsergroupeditComponent } from './usergroup/usergroupedit/usergroupedit.component';
import { UsergroupdeleteComponent } from './usergroup/usergroupdelete/usergroupdelete.component';
import { UsergrouppermissionComponent } from './usergroup/usergrouppermission/usergrouppermission.component';
import {MatIconModule} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ApiGroupModuleService } from './service/api-group-module.service';
import { UserlistComponent } from './user/userlist/userlist.component';
import { NewuserComponent } from './user/newuser/newuser.component';
import { DeleteuserComponent } from './user/deleteuser/deleteuser.component';
import { EdituserComponent } from './user/edituser/edituser.component';
import { ToastNotificationsModule } from "ngx-toast-notifications";
import { ApiUserModuleService } from './service/api-user-module.service';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from '../app/_helper/jwt.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewcompanyComponent } from './company/newcompany/newcompany.component';
import { ListcompanyComponent } from './company/listcompany/listcompany.component';
import { CompanydatabaselistComponent } from './_Companydatabase/companydatabaselist/companydatabaselist.component';
import { CompanydatabasenewComponent } from './_Companydatabase/companydatabasenew/companydatabasenew.component';
import { HomeDashboardComponent } from './home/home-dashboard/home-dashboard.component';
import { CustomerDashboardComponent } from './home/customer-dashboard/customer-dashboard.component';
import { CustomerAddComponent } from './_Customer/customer-add/customer-add.component';
import { CustomerListComponent } from './_Customer/customer-list/customer-list.component';
import { apiCustomerModuleService } from './service/api-customer-module.service';
import { CustomerDocumentNewComponent } from './_Customer/customer-document-new/customer-document-new.component';
import { ViewDocumentComponent } from './_Customer/view-document/view-document.component';
// import { AccountRoutingModule } from './login/account-routing.module';
// import { AuthGuard } from './_helper/auth.guard';

import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FormControlComponent } from './setting/form-control/form-control.component';
import { DownloadDocumentComponent } from './_Customer/download-document/download-document.component';
import { DeletedialogComponent } from './deletedialog/deletedialog.component';  

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormEntrylistComponent } from './formEntry/form-entrylist/form-entrylist.component';
import { FormEntryaddComponent } from './formEntry/form-entryadd/form-entryadd.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavigationComponent,
    UsergrouplistComponent,
    UsergroupaddComponent,
    UsergroupeditComponent,
    UsergroupdeleteComponent,
    UsergrouppermissionComponent,
    UserlistComponent,
    NewuserComponent,
    DeleteuserComponent,
    EdituserComponent,
    NewcompanyComponent,
    ListcompanyComponent,
    CompanydatabaselistComponent,
    CompanydatabasenewComponent,
    HomeDashboardComponent,
    CustomerDashboardComponent,
    CustomerAddComponent,
    CustomerListComponent,
    CustomerDocumentNewComponent,
    ViewDocumentComponent,
    FormControlComponent,
    DownloadDocumentComponent,
    DeletedialogComponent,
    FormEntrylistComponent,
    FormEntryaddComponent,
 
    
  
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastNotificationsModule ,
    MalihuScrollbarModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
    NgxDocViewerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ApiGroupModuleService,
    ApiUserModuleService,
    apiCustomerModuleService,
    {
      provide: MatDialogRef,
      useValue: {}
    }, 
    {provide: MAT_DIALOG_DATA, useValue: {}}
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
