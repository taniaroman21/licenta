import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicUserLoginComponent } from './clinic-user-login.component';

describe('ClinicUserLoginComponent', () => {
  let component: ClinicUserLoginComponent;
  let fixture: ComponentFixture<ClinicUserLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicUserLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
