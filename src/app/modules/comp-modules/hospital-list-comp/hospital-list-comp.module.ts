import { RouterModule } from '@angular/router';
import { IconsProviderModule } from './../../core-modules/icons-provider.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HospitalListComponent } from './../../../pages/hospital-list/hospital-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
@NgModule({
  declarations: [HospitalListComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzTableModule,
    NzGridModule,
    NzTypographyModule,
    NzButtonModule,
    IconsProviderModule,
    NzModalModule,
  ],
  exports: [HospitalListComponent],
})
export class HospitalListCompModule {}
