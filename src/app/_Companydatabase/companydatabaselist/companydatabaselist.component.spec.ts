import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydatabaselistComponent } from './companydatabaselist.component';

describe('CompanydatabaselistComponent', () => {
  let component: CompanydatabaselistComponent;
  let fixture: ComponentFixture<CompanydatabaselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanydatabaselistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanydatabaselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
