import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicRankListComponent } from './academic-rank-list.component';

describe('AcademicRankListComponent', () => {
  let component: AcademicRankListComponent;
  let fixture: ComponentFixture<AcademicRankListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicRankListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicRankListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
