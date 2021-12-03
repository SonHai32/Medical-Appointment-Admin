import { HospitalServiceFormComponent } from './../pages/hospital-service-form/hospital-service-form.component';
import { HospitalServiceListComponent } from './../pages/hospital-service-list/hospital-service-list.component';
import { HospitalServiceComponent } from './../pages/hospital-service/hospital-service.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HospitalServiceComponent,
    children: [
      {
        path: '',
        component: HospitalServiceListComponent,
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
            component: HospitalServiceFormComponent,
          },
          {
            path: 'edit/:id',
            component: HospitalServiceFormComponent,
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
export class HospitalServiceRoutingModule {}
