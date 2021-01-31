import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, EMPTY, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../Models/User';
import { login } from '../Models/Login';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserGroup } from '../Models/UserGroup';
import { CompanyGroup } from '../Models/CompanyGroup';
import { companyDatabase } from '../Models/CompanyDatabase';
@Injectable({
  providedIn: 'root'
})
export class ApiUserModuleService {

  myAppApi: string;
  myAppUrlUserList: string;
  myAppUrlUserSave: string;
  myAppUrlLoginIn: string;
  myAppUrlUsergroupAuto: string;
  myAppUrlCompanySave: string;
  myAppUrlCompanyList: string;
  myAppUrlCompanyGroupAuto: string;

  private userSubject: BehaviorSubject<login>;
  public loginn: Observable<login>;

  private CompanySelectedSubject: BehaviorSubject<companyDatabase>;
  public companySelectedData: Observable<companyDatabase>;
  constructor(private _http: HttpClient, private router: Router,) {
    this.myAppApi = environment.appUrl;
    this.myAppUrlUserList = 'api/user/userlist';
    this.myAppUrlUserSave = 'api/user/SaveUserData';
    this.myAppUrlLoginIn = 'api/user/LoginIn';
    this.myAppUrlUsergroupAuto = 'api/user/GetUserGroup/';
    this.myAppUrlCompanySave = 'api/company/SaveCompanyGroup';
    this.myAppUrlCompanyList = 'api/company/CompanyGroupList';
    this.myAppUrlCompanyGroupAuto = 'api/user/GetCompanyGroup/';
    this.userSubject = new BehaviorSubject<login>(JSON.parse(localStorage.getItem('login')));
    this.loginn = this.userSubject.asObservable();


    this.CompanySelectedSubject = new BehaviorSubject<companyDatabase>(JSON.parse(localStorage.getItem('CompanySelectData')));
    this.companySelectedData = this.CompanySelectedSubject.asObservable();

  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': '*/*'
    })
  }
  getUserList(): Observable<User[]> {
    
    return this._http.get<User[]>(this.myAppApi + this.myAppUrlUserList)
      .pipe(
        retry(5),
        catchError(this.errorHandler)
      )
  };
  //  save
  saveUser(User): Observable<User> {
    debugger
    return this._http.post<User>(this.myAppApi + this.myAppUrlUserSave, JSON.stringify(User), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  };
  //login
  loginIn(login): Observable<login> {

    return this._http.post<login>(this.myAppApi + this.myAppUrlLoginIn, JSON.stringify(login), this.httpOptions)
      .pipe(map(login => {
        debugger
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('login', JSON.stringify(login));
        this.userSubject.next(login);
        return login;
      }));
  };

  public get userValue(): login {
    return this.userSubject.value;
  }
  //companydatabase

  FnCompanyDatabaseSelcted(value): string {
    localStorage.setItem('CompanySelectData', JSON.stringify(value));
    this.CompanySelectedSubject.next(value);
    return value

  };

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('login');
    localStorage.removeItem('CompanySelectData');
    this.userSubject.next(null);
    this.CompanySelectedSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  //group Autocomplete
  emptyGroupCode = of<UserGroup[]>([]);
  getProGrpAutocomplete(groupCode: string): Observable<UserGroup[]> {
    debugger
    if (groupCode.length === 0) {
      return this.emptyGroupCode;
    }
    else {
      return this._http.get<UserGroup[]>(this.myAppApi + this.myAppUrlUsergroupAuto + groupCode)
        .pipe(
          retry(1),
          catchError(this.errorHandler)
        )
    }
  };

  //company group Autocomplete
  emptyCompGroupCode = of<CompanyGroup[]>([]);
  getCompanyGroupAutocomplete(comGroupCode: string): Observable<CompanyGroup[]> {
    
    if (comGroupCode.length === 0) {
      return this.emptyCompGroupCode;
    }
    else {
      return this._http.get<CompanyGroup[]>(this.myAppApi + this.myAppUrlCompanyGroupAuto + comGroupCode)
        .pipe(
          retry(1),
          catchError(this.errorHandler)
        )
    }
  };
  //.............................................end of login area................................//
  // start company area
  saveCompanyGroup(CompanyGroup): Observable<CompanyGroup> {
    return this._http.post<CompanyGroup>(this.myAppApi + this.myAppUrlCompanySave, JSON.stringify(CompanyGroup), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  };

  getCompanyGroupList(): Observable<CompanyGroup[]> {

    return this._http.get<CompanyGroup[]>(this.myAppApi + this.myAppUrlCompanyList)
      .pipe(
        retry(5),
        catchError(this.errorHandler)
      )
  };

  //.............................................end of company area......................................//
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
