import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbhLogoComponent } from './dbh-logo/dbh-logo.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DbhLogoComponent],
  exports: [DbhLogoComponent],
})
export class SharedUiModule {}
