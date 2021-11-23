import { HospitalListCompModule } from './../comp-modules/hospital-list-comp/hospital-list-comp.module';
import { HospitalFormCompModule } from './../comp-modules/hospital-form-comp/hospital-form-comp.module';
import { HospitalCompModule } from './../comp-modules/hospital-comp/hospital-comp.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalRoutingModule } from '../../routings/hospital-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HospitalRoutingModule,
    HospitalCompModule,
    HospitalFormCompModule,
    HospitalListCompModule,
  ],
})
export class HospitalModule {}
