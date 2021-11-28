import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicRankFormComponent } from './academic-rank-form.component';

describe('AcademicRankFormComponent', () => {
  let component: AcademicRankFormComponent;
  let fixture: ComponentFixture<AcademicRankFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicRankFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicRankFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
