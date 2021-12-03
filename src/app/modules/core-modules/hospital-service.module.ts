import { HospitalServiceFormCompModule } from './../comp-modules/hospital-service-form-comp/hospital-service-form-comp.module';
import { HospitalServiceCompModule } from './../comp-modules/hospital-service-comp/hospital-service-comp.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalServiceRoutingModule } from '../../routings/hospital-service-routing.module';
import { HospitalServiceListCompModule } from '../comp-modules/hospital-service-list-comp/hospital-service-list-comp.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HospitalServiceRoutingModule,
    HospitalServiceCompModule,
    HospitalServiceFormCompModule,
    HospitalServiceListCompModule
  ]
})
export class HospitalServiceModule { }
