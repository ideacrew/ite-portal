import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as BhsdActions from './bhsd.actions';
import * as BhsdSelectors from './bhsd.selectors';

@Injectable()
export class BhsdFacade {
  store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(BhsdSelectors.getBhsdLoaded));
  error$ = this.store.pipe(select(BhsdSelectors.getBhsdError));
  loadedAndError$ = this.store.pipe(select(BhsdSelectors.getLoadedAndError));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(BhsdActions.initBhsd());
  }
}
