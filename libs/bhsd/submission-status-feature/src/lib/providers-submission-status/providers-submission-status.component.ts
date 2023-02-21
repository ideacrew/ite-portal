import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, filter, map, switchMap } from 'rxjs';
import { BHSDService, SubmissionStatus } from '@dbh/bhsd/data-access';
import { getReportingPeriod, getReportingPeriodText } from '@dbh/bhsd/util';

@Component({
  templateUrl: './providers-submission-status.component.html',
  styleUrls: ['./providers-submission-status.component.scss'],
})
export class ProvidersSubmissionStatusComponent {
  statusFilter = '';
  submissionStatus$ = this.bhsdService.getFilteredSubmissionStatus({
    status: this.statusFilter,
  });
  constructor(
    private bhsdService: BHSDService,
    private route: ActivatedRoute
  ) {}

  thisReportingPeriod = getReportingPeriodText(getReportingPeriod(1));

  reportingPeriod = getReportingPeriod(1);

  // filters$: Observable<ParamMap> = this.route.queryParamMap.pipe(
  //   map((parameters: ParamMap) => parameters));

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  // ngOnInit() {
  //   this.updateFilters();
  // }

  // updateFilters(key?: string, value?: string) {
  //   this.filters$ = this.route.queryParamMap.pipe(
  //     map((parameters: ParamMap) => parameters));
  //   this.filters$.subscribe((parameters) => {
  //     this.statusFilter = parameters.get('status') ?? '';
  //     console.log(this.statusFilter);
  //     this.submissionStatus$ = this.bhsdService.getFilteredSubmissionStatus({
  //       status: this.statusFilter
  //     });
  //   })
  // }

  updateFilters(key: string, value?: any) {
    if (key === 'status') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      this.statusFilter = value.target.value ?? '';
    }
    this.submissionStatus$ = this.bhsdService.getFilteredSubmissionStatus({
      status: this.statusFilter,
    });
  }

  serviceType(submission: SubmissionStatus): string {
    const { mh, sud } = submission;

    if (mh && sud) {
      return 'MH & SUD';
    }

    if (mh && !sud) {
      return 'MH';
    }

    if (!mh && sud) {
      return 'SUD';
    }

    return '';
  }
}
