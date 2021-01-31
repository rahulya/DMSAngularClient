import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDocumentUploadCreateComponent } from './customer-document-upload-create.component';

describe('CustomerDocumentUploadCreateComponent', () => {
  let component: CustomerDocumentUploadCreateComponent;
  let fixture: ComponentFixture<CustomerDocumentUploadCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDocumentUploadCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDocumentUploadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
