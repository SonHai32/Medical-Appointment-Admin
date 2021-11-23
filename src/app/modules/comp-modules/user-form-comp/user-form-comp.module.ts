import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from 'src/app/pages/user-form/user-form.component';

@NgModule({
  declarations: [UserFormComponent],
  imports: [CommonModule],
  exports: [UserFormComponent],
})
export class UserFormCompModule {}
