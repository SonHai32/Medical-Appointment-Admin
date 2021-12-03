import { DoctorFormCompModule } from './../comp-modules/doctor-form-comp/doctor-form-comp.module';
import { DoctorCompModule } from './../comp-modules/doctor-comp/doctor-comp.module';
import { DoctorListCompModule } from './../comp-modules/doctor-list-comp/doctor-list-comp.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from '../../routings/doctor-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    DoctorCompModule,
    DoctorListCompModule,
    DoctorFormCompModule
  ]
})
export class DoctorModule { }
