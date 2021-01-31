import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergrouppermissionComponent } from './usergrouppermission.component';

describe('UsergrouppermissionComponent', () => {
  let component: UsergrouppermissionComponent;
  let fixture: ComponentFixture<UsergrouppermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergrouppermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergrouppermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
