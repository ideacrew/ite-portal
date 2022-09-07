import { Component, Input } from '@angular/core';

import {
  ExtractSubmissionResponse,
  ExtractSubmissionResponseV2,
} from '@dbh/provider-extract/data-access';

@Component({
  selector: 'dbh-file-information',
  templateUrl: './file-information.component.html',
  styleUrls: ['./file-information.component.scss'],
})
export class FileInformationComponent {
  @Input() submission!: ExtractSubmissionResponseV2 | ExtractSubmissionResponse;
}
