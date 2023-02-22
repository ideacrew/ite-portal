import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, map } from 'rxjs';

import {
  Extracts,
  BHSDService,
  ExtractSubmission,
} from '@dbh/bhsd/data-access';
import { AuthService } from '@dbh/auth';

@Component({
  templateUrl: './submissions-list.component.html',
  styleUrls: ['./submissions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionsListComponent {
  isDBHUser = this.authService.isDBHUser;
  page = '1';
  offset = '';
  perPage = 20;
  coverageStartFilter = '';
  coverageEndFilter = '';
  submissionStartFilter = '';
  submissionEndFilter = '';
  providerFilter = '';
  responseDetails$: Observable<Extracts> =
    this.bhsdService.getSubmissionsWithParams({ offset: this.offset });

  // getProviders(extracts: ExtractSubmission[]): object[] {
  //   return extracts.map((extract) => ({id: extract.provider_id, name: extract.provider_name}));
  // }

  getPages(count: number, active: string): Array<number | '...'> {
    const pages = Math.ceil(count / this.perPage);
    // eslint-disable-next-line unicorn/new-for-builtins
    const pageArray: Array<number | '...'> = Array(pages)
      .fill(0)
      .map((x, index) => index + 1);
    const lastItem = pageArray[pageArray.length - 1];
    const firstItem = pageArray[0];
    const activePage = Number(active);
    if (pageArray.length <= 5) {
      return pageArray;
    } else if (activePage < 5) {
      return [...pageArray.slice(0, 5), '...', '...', lastItem];
    } else if (activePage > pageArray.length - 4) {
      return [firstItem, '...', '...', ...pageArray.slice(-5)];
    } else {
      return [
        firstItem,
        '...',
        '...',
        pageArray[activePage - 2],
        pageArray[activePage - 1],
        pageArray[activePage],
        '...',
        '...',
        lastItem,
      ];
    }
    return pageArray;
  }

  updatePage(pageNumber: string) {
    this.page = pageNumber;
    this.offset = String((Number(pageNumber) - 1) * this.perPage);
    this.responseDetails$ = this.bhsdService.getSubmissionsWithParams({
      offset: this.offset,
    });
  }

  updateFilters(key: string, event: Event) {
    this.page = '1';
    this.offset = '';
    if (key === 'coverage_start') {
      const target = event.target as HTMLInputElement;
      this.coverageStartFilter = target.value ?? '';
    }
    if (key === 'coverage_end') {
      const target = event.target as HTMLInputElement;
      this.coverageEndFilter = target.value ?? '';
    }
    if (key === 'submission_start') {
      const target = event.target as HTMLInputElement;
      this.submissionStartFilter = target.value ?? '';
    }
    if (key === 'submission_end') {
      const target = event.target as HTMLInputElement;
      this.submissionEndFilter = target.value ?? '';
    }
    if (key === 'provider') {
      const target = event.target as HTMLInputElement;
      this.providerFilter = target.value ?? '';
    }
    this.responseDetails$ = this.bhsdService.getSubmissionsWithParams({
      coverageStart: this.coverageStartFilter,
      coverageEnd: this.coverageEndFilter,
      submissionStart: this.submissionStartFilter,
      submissionEnd: this.submissionEndFilter,
      offset: this.offset,
      provider: this.providerFilter,
    });
  }

  constructor(
    private bhsdService: BHSDService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
}
