import { UserFormCompModule } from './../comp-modules/user-form-comp/user-form-comp.module';
import { UserListCompModule } from './../comp-modules/user-list-comp/user-list-comp.module';
import { UserCompModule } from './../comp-modules/user-comp/user-comp.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from '../../routings/user-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    UserCompModule,
    UserListCompModule,
    UserFormCompModule,
  ],
})
export class UserModule {}
