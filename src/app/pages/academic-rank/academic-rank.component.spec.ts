import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicRankComponent } from './academic-rank.component';

describe('AcademicRankComponent', () => {
  let component: AcademicRankComponent;
  let fixture: ComponentFixture<AcademicRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicRankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
