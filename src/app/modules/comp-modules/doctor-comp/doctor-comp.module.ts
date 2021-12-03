import { RouterModule } from '@angular/router';
import { DoctorComponent } from './../../../pages/doctor/doctor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DoctorComponent],
  imports: [CommonModule, RouterModule],
  exports: [DoctorComponent],
})
export class DoctorCompModule {}
