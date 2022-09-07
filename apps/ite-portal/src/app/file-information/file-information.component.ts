import { Component, Input } from '@angular/core';

import {
  ExtractSubmissionResponse,
  ExtractSubmissionResponseV2,
} from '@dbh/provider-extract/data-access';

import { AuthService } from '../auth.service';

@Component({
  selector: 'dbh-file-information',
  templateUrl: './file-information.component.html',
  styleUrls: ['./file-information.component.scss'],
})
export class FileInformationComponent {
  providerName: string = this.authService.providerName;

  @Input() submission!: ExtractSubmissionResponseV2 | ExtractSubmissionResponse;
  constructor(private authService: AuthService) {}
}
