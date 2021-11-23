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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
