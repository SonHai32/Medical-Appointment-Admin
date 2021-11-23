import { IconsProviderModule } from './../../core-modules/icons-provider.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalFormComponent } from './../../../pages/hospital-form/hospital-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [HospitalFormComponent],
  imports: [
    CommonModule,
    NzGridModule,
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    NzTypographyModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
  ],
  exports: [HospitalFormComponent],
})
export class HospitalFormCompModule {}
