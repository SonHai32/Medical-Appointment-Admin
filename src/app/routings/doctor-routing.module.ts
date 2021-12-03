import { DoctorListComponent } from './../pages/doctor-list/doctor-list.component';
import { DoctorComponent } from './../pages/doctor/doctor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorFormComponent } from '../pages/doctor-form/doctor-form.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorComponent,
    children: [
      {
        path: '',
        component: DoctorListComponent,
      },
      {
        path: 'form',
        children: [
          {
            path: '',
            redirectTo: 'create',
            pathMatch: 'full',
          },
          {
            path: 'create',
            component: DoctorFormComponent,
          },
          {
            path: 'edit/:id',
            component: DoctorFormComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
