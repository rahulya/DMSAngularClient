import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDocumentUploadListComponent } from './customer-document-upload-list.component';

describe('CustomerDocumentUploadListComponent', () => {
  let component: CustomerDocumentUploadListComponent;
  let fixture: ComponentFixture<CustomerDocumentUploadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDocumentUploadListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDocumentUploadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
