import { AcademicRankFormComponent } from './../pages/academic-rank-form/academic-rank-form.component';
import { AcademicRankListComponent } from './../pages/academic-rank-list/academic-rank-list.component';
import { AcademicRankComponent } from './../pages/academic-rank/academic-rank.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AcademicRankComponent,
    children: [
      {
        path: '',
        component: AcademicRankListComponent,
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
            component: AcademicRankFormComponent,
          },
          {
            path: 'edit/:id',
            component: AcademicRankFormComponent,
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
export class AcademicRankRoutingModule {}
