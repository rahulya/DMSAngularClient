import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupeditComponent } from './usergroupedit.component';

describe('UsergroupeditComponent', () => {
  let component: UsergroupeditComponent;
  let fixture: ComponentFixture<UsergroupeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergroupeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergroupeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
