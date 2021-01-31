import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupdeleteComponent } from './usergroupdelete.component';

describe('UsergroupdeleteComponent', () => {
  let component: UsergroupdeleteComponent;
  let fixture: ComponentFixture<UsergroupdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergroupdeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergroupdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
