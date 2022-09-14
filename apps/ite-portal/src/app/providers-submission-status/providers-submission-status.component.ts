import { Component } from '@angular/core';

import { ProviderExtractService } from '@dbh/provider-extract/data-access';

@Component({
  templateUrl: './providers-submission-status.component.html',
  styleUrls: ['./providers-submission-status.component.scss'],
})
export class ProvidersSubmissionStatusComponent {
  submissionStatus$ = this.providerService.getSubmissionStatus();
  constructor(private providerService: ProviderExtractService) {}

  get thisReportingPeriod(): string {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthsName = lastMonth.toLocaleString('en-US', {
      month: 'long',
    });
    const year = today.getFullYear();

    return `${lastMonthsName}, ${year}`;
  }
}
