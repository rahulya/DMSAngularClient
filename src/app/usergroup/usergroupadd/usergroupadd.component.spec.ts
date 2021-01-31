import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupaddComponent } from './usergroupadd.component';

describe('UsergroupaddComponent', () => {
  let component: UsergroupaddComponent;
  let fixture: ComponentFixture<UsergroupaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergroupaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergroupaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
