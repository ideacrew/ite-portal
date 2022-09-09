import { Component } from '@angular/core';

import { ProviderExtractService } from '@dbh/provider-extract/data-access';

@Component({
  templateUrl: './providers-submission-status.component.html',
  styleUrls: ['./providers-submission-status.component.scss'],
})
export class ProvidersSubmissionStatusComponent {
  submissionStatus$ = this.providerService.getSubmissionStatus();
  constructor(private providerService: ProviderExtractService) {}
}
