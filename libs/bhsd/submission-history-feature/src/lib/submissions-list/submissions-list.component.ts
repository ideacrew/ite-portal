import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, map } from 'rxjs';

import { Extracts, BHSDService } from '@dbh/bhsd/data-access';
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
  responseDetails$: Observable<Extracts> =
    this.bhsdService.getSubmissionsWithParams({ offset: this.offset });
  page$: Observable<string> = this.route.queryParamMap.pipe(
    map((parameters: ParamMap) => parameters.get('page') ?? '1')
  );
  pageArray: number[] = [1];

  getPages(count: number, active: string): number[] {
    const pages = Math.ceil(count / this.perPage);
    // eslint-disable-next-line unicorn/new-for-builtins
    const pageArray: number[] = Array(pages)
      .fill(0)
      .map((x, index) => index + 1);
    const lastItem = pageArray[pageArray.length - 1];
    const firstItem = pageArray[0];
    const activePage = Number(active);
    if (pageArray.length <= 5) {
      return pageArray;
    } else if (activePage < 5) {
      return [...pageArray.slice(0, 5), lastItem];
    } else if (activePage > pageArray.length - 6) {
      return [firstItem, ...pageArray.slice(-5)];
    } else {
      return [
        firstItem,
        pageArray[activePage - 3],
        pageArray[activePage - 2],
        pageArray[activePage - 1],
        pageArray[activePage],
        pageArray[activePage + 1],
        lastItem,
      ];
    }
    return pageArray;
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.updatePage();
  }

  updatePage() {
    this.page$ = this.route.queryParamMap.pipe(
      map((parameters: ParamMap) => parameters.get('page') ?? '1')
    );
    this.page$.subscribe((page) => {
      this.offset = String((Number(page) - 1) * this.perPage);
      this.responseDetails$ = this.bhsdService.getSubmissionsWithParams({
        offset: this.offset,
      });
      this.responseDetails$.subscribe((extract) => {
        this.pageArray = this.getPages(extract.total_extract_count, page);
      });
    });
  }

  constructor(
    private bhsdService: BHSDService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
}
