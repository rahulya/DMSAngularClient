import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, EMPTY, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { customer } from '../Models/Customer';
import { customerDocument } from 'src/app/Models/CustomerDocument';
import { getUploadUrl } from '../ViewModels/GetUploadUrl';
import { documentright } from '../Models/DocumentRight';
import { customerViewModel } from '../ViewModels/CustomerViewModel';
import { customerDocumentViewModel } from '../ViewModels/CustomerDocumentViewModel';
import { formEntry } from '../Models/FormEntry';
import { customerDocumentUdf } from '../Models/CustomerDocumentUdf';
@Injectable({
  providedIn: 'root'
})
export class apiCustomerModuleService {

  myAppApi: string;
  myAppUrlCustomerList: string;
  myAppUrlSaveCustomerData: string;
  myAppUrlSetDatabaseName: string;
  myAppUrlCustomerDocumentSaveData: string;
  myAppUrlCustomerDocumentDownloadFile: string;
  myAppUrlGetCustomerDocByCustomerID:string;
  myAppUrlUploadViewByCustomerID;
  myAppUrlDocumentRightList:string;
  myAppUrlSaveDocumentRight:string;
  myAppUrlGetUpdateCustomerData:string;
  myAppUrlUpdateCustomerData: string;
  myAppUrlGetUpdateCustomerDocumentData:string;
  myAppUrlGetDeleteCustomerDocumentData:string;
  //SaveFormEntry
  myAppUrlSaveFormEntry:string;
  myAppUrlGetFormEntryList:string;

  myAppUrlCustomerDocumentSaveDataUdf:string;

  constructor(private _http: HttpClient) {
    debugger
    this.myAppApi = environment.appUrl;
    this.myAppUrlCustomerList = 'api/customer/customerList';
    this.myAppUrlSaveCustomerData = 'api/customer/SaveCustomerData';
    this.myAppUrlSetDatabaseName = 'api/customer/SetDatabaseName/';
    this.myAppUrlCustomerDocumentSaveData = 'api/customer/CustomerDocumentSaveData';
    this.myAppUrlCustomerDocumentDownloadFile = 'api/customer/DownloadFile/';
    this.myAppUrlGetCustomerDocByCustomerID = 'api/customer/GetCustomerDocByCustomerID/';
    this.myAppUrlUploadViewByCustomerID='api/customer/UploadFileView/';
    this.myAppUrlDocumentRightList = 'api/customer/Documentright';
    this.myAppUrlSaveDocumentRight = 'api/customer/saveDocumentRight';
    this.myAppUrlGetUpdateCustomerData='api/customer/GetUpdateCustomerData/';
    this.myAppUrlUpdateCustomerData='api/customer/UpdateCustomer';
    this.myAppUrlGetUpdateCustomerDocumentData='api/customer/GetUpdateCustomerDocumentData/';
    this.myAppUrlGetDeleteCustomerDocumentData='api/customer/DeleteCustomerData/';
    this.myAppUrlSaveFormEntry='api/customer/SaveFormEntry';
    this.myAppUrlGetFormEntryList='api/customer/GetFormEntryList';
    this.myAppUrlCustomerDocumentSaveDataUdf='api/customer/CustomerDocumentSaveDataUdf';
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': '*/*'
    })

  }
  getCustomerList(): Observable<customer[]> {
    debugger
    return this._http.get<customer[]>(this.myAppApi + this.myAppUrlCustomerList)
      .pipe(map(customerList => {
        debugger
        return customerList;
      }))
  };

  //  save
  saveCustomerData(customer): Observable<customer> {
    debugger
    return this._http.post<customer>(this.myAppApi + this.myAppUrlSaveCustomerData, JSON.stringify(customer), this.httpOptions)
      .pipe(map(customer => {
        debugger
        // store user details and jwt token in local storage to keep user logged in between page refreshes  
        return customer;
      }));
  };

  saveCustomerDocumentData(customerDocument): Observable<customerDocument> {
    debugger
    return this._http.post<customerDocument>(this.myAppApi + this.myAppUrlCustomerDocumentSaveData, customerDocument)
      .pipe(map(customer => {
        debugger
        // store user details and jwt token in local storage to keep user logged in between page refreshes  
        return customer;
      }));
  };

  SetDatabaseName(DatabaseName: string): Observable<customer[]> {
    debugger
    return this._http.get<customer[]>(this.myAppApi + this.myAppUrlSetDatabaseName + DatabaseName)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  };



  DownloadCustomerFile(fileName: string): Observable<object> {
    debugger

    return this._http.get(this.myAppApi + this.myAppUrlCustomerDocumentDownloadFile + fileName, {
      responseType: 'blob'

    })
  };

  GetCustomerDocByCustomerID(customerId: number): Observable<object> {
    debugger
    return this._http.get<[]>(this.myAppApi + this.myAppUrlGetCustomerDocByCustomerID + customerId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  };
  GetUploadFileViewByCustomerID(customerId: number): Observable<getUploadUrl> {
    debugger
    return this._http.get<getUploadUrl>(this.myAppApi + this.myAppUrlUploadViewByCustomerID + customerId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  };


  getdocumentright(): Observable<documentright[]> {
    debugger
    return this._http.get<documentright[]>(this.myAppApi + this.myAppUrlDocumentRightList)
      .pipe(map(customerList => {
        debugger
        return customerList;
      }))
  };


  saveDocumentRight(documentright): Observable<documentright> {
    debugger
    return this._http.post<documentright>(this.myAppApi + this.myAppUrlSaveDocumentRight, documentright)
      .pipe(map(customer => {
        debugger
        // store user details and jwt token in local storage to keep user logged in between page refreshes  
        return customer;
      }));
  };



    //  save
    UpdateCustomerData(customer): Observable<customerViewModel> {
      debugger
      return this._http.post<customerViewModel>(this.myAppApi + this.myAppUrlUpdateCustomerData, JSON.stringify(customer), this.httpOptions)
        .pipe(map(customer => {
          debugger
          // store user details and jwt token in local storage to keep user logged in between page refreshes  
          return customer;
        }));
    };
  
    GetUpdateCustomerData(CustomerId: number): Observable<customerViewModel> {
      return this._http.get<customerViewModel>(this.myAppApi + this.myAppUrlGetUpdateCustomerData + CustomerId)
        .pipe(
          retry(1),
          catchError(this.errorHandler)
        )
    };


    GetUpdateCustomerDocumentData(CustomerId: number): Observable<customerDocumentViewModel> {
      return this._http.get<customerDocumentViewModel>(this.myAppApi + this.myAppUrlGetUpdateCustomerDocumentData + CustomerId)
        .pipe(
          retry(1),
          catchError(this.errorHandler)
        )
    };


    deleteCustomer(CustomerId: number): Observable<customer> {
      debugger
      return this._http.delete<customer>(this.myAppApi + this.myAppUrlGetDeleteCustomerDocumentData + CustomerId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
    };
   
    //form entry
      //  save
  saveFormEntryData(formEntry): Observable<formEntry> {
    debugger
    return this._http.post<formEntry>(this.myAppApi + this.myAppUrlSaveFormEntry, JSON.stringify(formEntry), this.httpOptions)
      .pipe(map(form => {
        debugger
        // store user details and jwt token in local storage to keep user logged in between page refreshes  
        return form;
      }));
  };


  GetFormEntryList(): Observable<formEntry[]> {
    debugger
    return this._http.get<formEntry[]>(this.myAppApi + this.myAppUrlGetFormEntryList)
      .pipe(map(formEntryList => {
        debugger
        return formEntryList;
      }))
  };
  

  saveCustomerDocumentDataUdf(customerDocumentUdf): Observable<customerDocumentUdf> {
    debugger
    return this._http.post<customerDocumentUdf>(this.myAppApi + this.myAppUrlCustomerDocumentSaveDataUdf, customerDocumentUdf)
      .pipe(map(customer => {
        debugger
        // store user details and jwt token in local storage to keep user logged in between page refreshes  
        return customer;
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
