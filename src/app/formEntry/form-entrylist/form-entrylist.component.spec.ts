import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEntrylistComponent } from './form-entrylist.component';

describe('FormEntrylistComponent', () => {
  let component: FormEntrylistComponent;
  let fixture: ComponentFixture<FormEntrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEntrylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEntrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
