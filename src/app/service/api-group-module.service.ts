import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, EMPTY, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UserGroup } from '../Models/UserGroup';
import { companyDatabase } from 'src/app/Models/CompanyDatabase'
import { companyDatabaseViewModel, parameterOne } from '../ViewModels/CompanyDatabseViewModel';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiGroupModuleService {

  myAppApi: string;

  myAppUrlUserGroupList: string;
  myAppUrlSaveUserGroupData: string;
  myAppUrlCreateCompanyDatabase: string;
  myAppUrlUserWiseComDbList: string;
  constructor(private _http: HttpClient) {
    debugger
    this.myAppApi = environment.appUrl;
    this.myAppUrlUserGroupList = 'api/user/UserGroupList';
    this.myAppUrlSaveUserGroupData = 'api/user/SaveUserGroupData';
    this.myAppUrlCreateCompanyDatabase = 'api/company/CreateCompanyDatabase';
    this.myAppUrlUserWiseComDbList = 'api/company/UserWiseComDbList';


  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': '*/*'
    })

  }
  getUserGroupList(): Observable<UserGroup[]> {
    debugger
    return this._http.get<UserGroup[]>(this.myAppApi + this.myAppUrlUserGroupList)
      .pipe(
        retry(5),
        catchError(this.errorHandler)
      )
  };
  //  save
  saveUserGroup(UserGroup): Observable<UserGroup> {
    debugger
    return this._http.post<UserGroup>(this.myAppApi + this.myAppUrlSaveUserGroupData, JSON.stringify(UserGroup), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  };


  //  save company database
  CreateCompanyDatabase(companyDatabase): Observable<companyDatabase> {
    debugger
    return this._http.post<companyDatabase>(this.myAppApi + this.myAppUrlCreateCompanyDatabase, JSON.stringify(companyDatabase), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  };



  getUserWiseCompanyDbList(parameterOne): Observable<parameterOne> {

    return this._http.post<parameterOne>(this.myAppApi + this.myAppUrlUserWiseComDbList, JSON.stringify(parameterOne), this.httpOptions)
      .pipe(map(parameterOne => {
        debugger
        // store user details and jwt token in local storage to keep user logged in between page refreshes
      
        return parameterOne;
      }));
  };

  


  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
