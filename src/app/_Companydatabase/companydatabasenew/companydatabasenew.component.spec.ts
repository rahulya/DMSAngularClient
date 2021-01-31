import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydatabasenewComponent } from './companydatabasenew.component';

describe('CompanydatabasenewComponent', () => {
  let component: CompanydatabasenewComponent;
  let fixture: ComponentFixture<CompanydatabasenewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanydatabasenewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanydatabasenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
