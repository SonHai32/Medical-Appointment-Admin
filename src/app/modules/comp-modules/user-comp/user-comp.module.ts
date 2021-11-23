import { RouterModule } from '@angular/router';
import { UserComponent } from './../../../pages/user/user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, RouterModule],
  exports: [UserComponent],
})
export class UserCompModule {}
