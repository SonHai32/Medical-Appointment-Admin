import { HospitalFormComponent } from './../pages/hospital-form/hospital-form.component';
import { HospitalListComponent } from './../pages/hospital-list/hospital-list.component';
import { HospitalComponent } from './../pages/hospital/hospital.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HospitalComponent,
    children: [
      {
        path: '',
        component: HospitalListComponent,
      },
      {
        path: 'create',
        component: HospitalFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalRoutingModule {}
