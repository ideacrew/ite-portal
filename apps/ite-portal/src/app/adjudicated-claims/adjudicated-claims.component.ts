/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/unbound-method */
import { Component } from '@angular/core';
import { VizCreateOptions } from 'ngx-tableau';

@Component({
  template: `<ngx-tableau
    serverUrl="https://tableau.dbh-ite.com"
    report="Summary/D1-Summary"
    [options]="options"
  ></ngx-tableau>`,
})
export class AdjudicatedClaimsComponent {
  options: VizCreateOptions = {
    height: '90vh',
    width: '100%',
  };
}
