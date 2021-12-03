import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalServiceFormComponent } from './hospital-service-form.component';

describe('HospitalServiceFormComponent', () => {
  let component: HospitalServiceFormComponent;
  let fixture: ComponentFixture<HospitalServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalServiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
