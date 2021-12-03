import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/core-modules/user.module').then((m) => m.UserModule),
  },
  {
    path: 'hospital',
    loadChildren: () =>
      import('./modules/core-modules/hospital.module').then(
        (m) => m.HospitalModule
      ),
  },
  {
    path: 'academic-rank',
    loadChildren: () =>
      import('./modules/core-modules/academic-rank.module').then(
        (m) => m.AcademicRankModule
      ),
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./modules/core-modules/doctor.module').then(
        (m) => m.DoctorModule
      ),
  },
  {
    path: 'hospital-service',
    loadChildren: () =>
      import('./modules/core-modules/hospital-service.module').then(
        (m) => m.HospitalServiceModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
