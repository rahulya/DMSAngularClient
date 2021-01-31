import { Component, OnInit, ViewChild, ElementRef, Inject,SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  Toaster, ToastType } from "ngx-toast-notifications";
import {customer}from '../../Models/Customer';
import { apiCustomerModuleService } from 'src/app/service/api-customer-module.service';
import { customerDocument } from 'src/app/Models/CustomerDocument';
import { customerViewModel } from 'src/app/ViewModels/CustomerViewModel';
import { customerDocumentViewModel } from 'src/app/ViewModels/CustomerDocumentViewModel';

@Component({
  selector: 'app-customer-document-new',
  templateUrl: './customer-document-new.component.html',
  styleUrls: ['./customer-document-new.component.css']
})
export class CustomerDocumentNewComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  actionType: string;
  errorMessage: any;
  customerID:number;
  existingCustomer: customerViewModel;
  existingCustomerDocument:customerDocumentViewModel;
  constructor(private formBuilder: FormBuilder,private _http:apiCustomerModuleService,
    private avRoute: ActivatedRoute, private router: Router,private toaster: Toaster) {
   debugger


   var id = this.avRoute.snapshot.paramMap.get('id');
   
    if (id) {
      this.customerID = Number(id);
      
    //  this.actionType = 'Insert';
    }
    
  
  }

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      photocopyOfLalpurjaDoc: [''],
      taxClearanceDoc: [''],     
      naapiNaksaWithKittaNoDoc:[''], 
      houseDesginMapDoc: [''], 
      issueTemporayCertification: [''],  
      permamentCertification: [''],           
      approvalOfWardChair:[''], 
      approvalOfWardChairLackOfAccessOfRoad: [''],
      customerId:  [''],  
      citizenshipDoc:[''],  
      completionCertification:[''], 
     // fileSource: new FormControl('', [Validators.required]),
     photoCopyOfLalpurjaFile:new FormControl('',[Validators.required]),
      taxClearanceFile: new FormControl('', [Validators.required]),
      citizenshipDocFile:new FormControl('',[Validators.required]),
      naapiNaskaDocFile:new FormControl('',[Validators.required]),
      houseDesignMapDocFile:new FormControl('',[Validators.required]),

    });
    debugger
    this._http.GetUpdateCustomerData(this.customerID).subscribe((data) => {
        debugger
      this.existingCustomer=data[0];

      if(this.existingCustomer.isFileSave==true){
        debugger
        this.actionType = 'Update';
      
          
      
          this._http.GetUpdateCustomerDocumentData(this.customerID).subscribe((dataa) => {
    
            debugger
            this.existingCustomerDocument=dataa[0];
            if (dataa != null) {
             // this.existingCustomer = data[0];
              debugger
              this.form.controls["photoCopyOfLalpurjaFile"].setValue(this.existingCustomerDocument.photocopyOfLalpurjaDoc)
              this.form.controls["taxClearanceFile"].setValue(this.existingCustomerDocument.taxClearanceDoc)
              this.form.controls["naapiNaskaDocFile"].setValue(this.existingCustomerDocument.naapiNaksaWithKittaNoDoc)
              this.form.controls["citizenshipDocFile"].setValue(this.existingCustomerDocument.citizenshipDoc)
    
    
              this.form.controls["houseDesignMapDocFile"].setValue(this.existingCustomerDocument.houseDesginMapDoc)
              this.form.controls["issueTemporayCertification"].setValue(this.existingCustomerDocument.issueTemporayCertification)
              this.form.controls["permamentCertification"].setValue(this.existingCustomerDocument.permamentCertification)
              this.form.controls["completionCertification"].setValue(this.existingCustomerDocument.completionCertification)
              this.form.controls["approvalOfWardChairLackOfAccessOfRoad"].setValue(this.existingCustomerDocument.approvalOfWardChairLackOfAccessOfRoad)
    
              this.form.controls["approvalOfWardChair"].setValue(this.existingCustomerDocument.approvalOfWardChair)
              
             
            }
          })
    //
      
        }else{
          this.actionType = 'Insert'
        }
    });

    
  };
 // get f() { return this.form.controls; }


 CustomerDocumentSave() {
    debugger

    const formData: FormData = new FormData();
  
    
   
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.actionType === 'Insert') {
      //if add thn
      let customerDoc: customerDocument = { 
        photocopyOfLalpurjaDoc: this.form.get("photocopyOfLalpurjaDoc").value,     
        taxClearanceDoc: this.form.get("taxClearanceDoc").value,
        naapiNaksaWithKittaNoDoc: this.form.get("naapiNaksaWithKittaNoDoc").value,      
        citizenshipDoc: this.form.get("citizenshipDoc").value,
        houseDesginMapDoc:this.form.get("houseDesginMapDoc").value,
        issueTemporayCertification: this.form.get("issueTemporayCertification").value,         
        permamentCertification: this.form.get("permamentCertification").value,      
        completionCertification: this.form.get("completionCertification").value,    
        approvalOfWardChair: this.form.get("approvalOfWardChair").value,      
        approvalOfWardChairLackOfAccessOfRoad:this.form.get("approvalOfWardChairLackOfAccessOfRoad").value,  
        customerId:  this.customerID,     
        /// file  
        photoCopyOfLalpurjaFile: this.form.get('photoCopyOfLalpurjaFile').value,
        taxClearanceFile: this.form.get('taxClearanceFile').value,
        citizenshipDocFile: this.form.get('citizenshipDocFile').value,
        naapiNaskaDocFile:this.form.get('naapiNaskaDocFile').value,
        houseDesignMapDocFile:this.form.get('houseDesignMapDocFile').value,
        actionType:this.actionType
      };
      debugger
      formData.append('actionType',customerDoc.actionType.toString());
      formData.append('photoCopyOfLalpurjaFile', customerDoc.photoCopyOfLalpurjaFile,customerDoc.photoCopyOfLalpurjaFile.name);
      formData.append('taxClearanceFile', customerDoc.taxClearanceFile,customerDoc.taxClearanceFile.name);
      formData.append('citizenshipDocFile', customerDoc.citizenshipDocFile,customerDoc.citizenshipDocFile.name);
      formData.append('naapiNaskaDocFile', customerDoc.naapiNaskaDocFile,customerDoc.naapiNaskaDocFile.name);
      formData.append('houseDesignMapDocFile', customerDoc.houseDesignMapDocFile,customerDoc.houseDesignMapDocFile.name);
      formData.append('customerId',customerDoc.customerId.toString());
      formData.append('taxClearanceDoc',customerDoc.taxClearanceDoc.toString());
      formData.append('citizenshipDoc',customerDoc.citizenshipDoc.toString());
      formData.append('houseDesginMapDoc',customerDoc.houseDesginMapDoc.toString());
      formData.append('issueTemporayCertification',customerDoc.issueTemporayCertification.toString());
      formData.append('completionCertification',customerDoc.completionCertification.toString());
      formData.append('approvalOfWardChair',customerDoc.approvalOfWardChair.toString());
      formData.append('approvalOfWardChairLackOfAccessOfRoad',customerDoc.approvalOfWardChairLackOfAccessOfRoad.toString());
    
      debugger
      this._http.saveCustomerDocumentData(formData).subscribe((data) => { 
        debugger        
       this.showToast();
       this.onReset()      
     });
    }
  };


  onPhotoCopyOfLalpurjaFileChange(event) {
  debugger
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        
        photoCopyOfLalpurjaFile: file
      });
    }
  }

  onTaxClearanceFileChange(event)
  {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        
        taxClearanceFile: file
      });
    }
  }

  onCitizenshipDocFileChange(event)
  {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        
        citizenshipDocFile: file
      });
    }
  }

  onNaapiNaskaDocFileChange(event)
  {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({ 
        naapiNaskaDocFile: file
      });
    }
  }

  onHouseDesignMapDocFileChange(event)
  {
    if (event.target.files.length > 0) {
      debugger
      const file = event.target.files[0];
      this.form.patchValue({ 
      
        houseDesignMapDocFile: file
      });
    }
  }
  
  getCustomerListByCustomerID(customerId) {
    debugger
   

  };


  


  

  
  
  
  //other parts
  private types: Array<ToastType> = ['success', 'danger', 'warning', 'info', 'primary', 'secondary', 'dark', 'light'];
  private text = 'Save Success';
  private onErrorText = 'Error While Saving';
  showToast() {
    const type = this.types[0];
    this.toaster.open({
      position: 'top-right',
      text: 'Customer Has been Created',
      caption: 'Customer Entry',
      duration: 2000,
      type: 'success',
    });
  };

  onReset() {
    this.submitted = false;
    this.form.reset();
  };
}

