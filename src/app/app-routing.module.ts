import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NewuserComponent } from './user/newuser/newuser.component';
import { UserlistComponent } from './user/userlist/userlist.component';
import { UsergroupaddComponent } from './usergroup/usergroupadd/usergroupadd.component';
import { UsergrouplistComponent } from './usergroup/usergrouplist/usergrouplist.component';
import { AuthGuard } from '../app/_helper/auth.guard';
import { ListcompanyComponent } from './company/listcompany/listcompany.component';
import { NewcompanyComponent } from './company/newcompany/newcompany.component';
import { HomeDashboardComponent } from './home/home-dashboard/home-dashboard.component';
import { CustomerListComponent } from './_Customer/customer-list/customer-list.component';
import { CustomerAddComponent } from './_Customer/customer-add/customer-add.component';
import { CompanydatabasenewComponent } from './_Companydatabase/companydatabasenew/companydatabasenew.component';
import { CustomerDocumentNewComponent } from './_Customer/customer-document-new/customer-document-new.component';
import { ViewDocumentComponent } from './_Customer/view-document/view-document.component';
import { FormControlComponent } from './setting/form-control/form-control.component';
import { DownloadDocumentComponent } from './_Customer/download-document/download-document.component';
import { FormEntrylistComponent } from './formEntry/form-entrylist/form-entrylist.component';
import { FormEntryaddComponent } from './formEntry/form-entryadd/form-entryadd.component';


const accountModule = () => import('../app/login/account.module').then(x => x.AccountModule);
const usersModule = () => import('../app/app.module').then(x => x.AppModule);
const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'UsergGroupList', component:UsergrouplistComponent  },
  { path: 'newUsergGroup', component:UsergroupaddComponent  },
  { path: 'UserList', component:UserlistComponent  },
  { path: 'newUser', component:NewuserComponent  },
  { path: 'CompanyList', component:ListcompanyComponent  },
  { path: 'CompanyNew', component:NewcompanyComponent  },
  { path: 'home-dashboard', component:HomeDashboardComponent  },
  { path: 'route-customerlist', component:CustomerListComponent  },
  { path: 'route-addcustomer', component:CustomerAddComponent  },
  { path: 'route-addCompanyDatabase', component:CompanydatabasenewComponent  },
  // { path: 'route-addCustomerDocumentFile/:id', component:CustomerDocumentNewComponent  },
  { path: 'route-DownLoadDocument/:id', component:DownloadDocumentComponent  },
  { path: 'route-clientFormSetting', component:FormControlComponent   },
  { path: 'route-viewDocument/:pathUrl', component:ViewDocumentComponent  },
  { path: 'route-Updatecustomer/:id', component:CustomerAddComponent  },
  { path: 'route-FormEntry', component:FormEntrylistComponent   },
  { path: 'newRouteFormEntry', component:FormEntryaddComponent   },
  // {path:'routerdocumentdocupload',component:CustomerDocumentUploadCreateComponent},


  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
