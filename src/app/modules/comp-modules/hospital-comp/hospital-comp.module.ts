import { RouterModule } from '@angular/router';
import { HospitalComponent } from './../../../pages/hospital/hospital.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HospitalComponent],
  imports: [CommonModule, RouterModule],
  exports: [HospitalComponent],
})
export class HospitalCompModule {}
