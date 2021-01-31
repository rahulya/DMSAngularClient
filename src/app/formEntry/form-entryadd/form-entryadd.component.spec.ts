import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEntryaddComponent } from './form-entryadd.component';

describe('FormEntryaddComponent', () => {
  let component: FormEntryaddComponent;
  let fixture: ComponentFixture<FormEntryaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEntryaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEntryaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
