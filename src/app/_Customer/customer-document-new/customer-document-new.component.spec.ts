import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDocumentNewComponent } from './customer-document-new.component';

describe('CustomerDocumentNewComponent', () => {
  let component: CustomerDocumentNewComponent;
  let fixture: ComponentFixture<CustomerDocumentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDocumentNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDocumentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
