import { AcademicRankListCompModule } from './../comp-modules/academic-rank-list-comp/academic-rank-list-comp.module';
import { AcademicRankFormCompModule } from './../comp-modules/academic-rank-form-comp/academic-rank-form-comp.module';
import { AcademicRankCompModule } from './../comp-modules/academic-rank-comp/academic-rank-comp.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicRankRoutingModule } from '../../routings/academic-rank-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AcademicRankRoutingModule,
    AcademicRankCompModule,
    AcademicRankFormCompModule,
    AcademicRankListCompModule,
  ]
})
export class AcademicRankModule { }
