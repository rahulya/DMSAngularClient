import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.css']
})
export class ViewDocumentComponent implements OnInit {
  myAppApii: string;
  fullUrl:string;

  pathURl:string;
  constructor(private avRoute: ActivatedRoute) { 
    debugger
    var id = this.avRoute.snapshot.paramMap.get('pathUrl');
    debugger
        if (id) {
          this.pathURl= id;
          this.myAppApii = environment.appUrl;
          this.fullUrl= this.myAppApii+ this.pathURl;
        }

  }  
viewer = 'google'; 
selectedType = 'pdf';   
DemoDoc:string;
  
  ngOnInit(): void {  
 this.DemoDoc=this.fullUrl 
  }  
}
