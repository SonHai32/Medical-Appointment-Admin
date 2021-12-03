import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalServiceComponent } from './hospital-service.component';

describe('HospitalServiceComponent', () => {
  let component: HospitalServiceComponent;
  let fixture: ComponentFixture<HospitalServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
