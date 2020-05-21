import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicListItemComponent } from './clinic-list-item.component';

describe('ClinicListItemComponent', () => {
  let component: ClinicListItemComponent;
  let fixture: ComponentFixture<ClinicListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
