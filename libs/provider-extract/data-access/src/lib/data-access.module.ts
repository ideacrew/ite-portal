import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetRecordIdentifierPipe } from './get-record-identifier.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [GetRecordIdentifierPipe],
  exports: [GetRecordIdentifierPipe],
})
export class DataAccessModule {}
