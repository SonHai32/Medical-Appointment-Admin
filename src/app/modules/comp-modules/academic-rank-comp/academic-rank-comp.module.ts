import { RouterModule } from '@angular/router';
import { AcademicRankComponent } from './../../../pages/academic-rank/academic-rank.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AcademicRankComponent],
  imports: [CommonModule, RouterModule],
  exports: [AcademicRankComponent],
})
export class AcademicRankCompModule {}
