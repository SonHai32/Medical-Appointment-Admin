import { HospitalServiceComponent } from './../../../pages/hospital-service/hospital-service.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HospitalServiceComponent],
  imports: [CommonModule, RouterModule],
  exports: [HospitalServiceComponent],
})
export class HospitalServiceCompModule {}
