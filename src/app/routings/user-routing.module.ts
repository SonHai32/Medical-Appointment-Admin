import { UserComponent } from './../pages/user/user.component';
import { UserFormComponent } from './../pages/user-form/user-form.component';
import { UserListComponent } from './../pages/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'create',
        component: UserFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
