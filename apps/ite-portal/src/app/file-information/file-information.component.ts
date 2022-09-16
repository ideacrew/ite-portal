import { Component, Input } from '@angular/core';

@Component({
  selector: 'dbh-file-information',
  templateUrl: './file-information.component.html',
  styleUrls: ['./file-information.component.scss'],
})
export class FileInformationComponent {
  @Input() providerName!: string;
  @Input() fileName!: string | null;
  @Input() reportingPeriod!: string;
  @Input() submissionDate!: string;
}
