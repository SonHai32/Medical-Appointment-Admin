import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalServiceListComponent } from './hospital-service-list.component';

describe('HospitalServiceListComponent', () => {
  let component: HospitalServiceListComponent;
  let fixture: ComponentFixture<HospitalServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalServiceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
