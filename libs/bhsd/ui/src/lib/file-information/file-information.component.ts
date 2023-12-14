import { Component, Input } from '@angular/core';

@Component({
  selector: 'dbh-file-information',
  templateUrl: './file-information.component.html',
  styleUrls: ['./file-information.component.scss'],
})
export class FileInformationComponent {
  @Input() providerName!: string;
  @Input() providerId!: string;
  @Input() fileName!: string | null;
  @Input() reportingPeriod!: string | null;
  @Input() submissionDate!: string;
  @Input() submissionId: string | undefined;
  @Input() providerActiveStatus: string | undefined;
}
