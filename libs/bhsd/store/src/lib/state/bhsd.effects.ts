/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as BhsdActions from './bhsd.actions';

@Injectable()
export class BhsdEffects {
  init$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BhsdActions.initBhsd),
        tap(() => console.log('BHSD Init!'))
      );
    },
    { dispatch: false }
  );

  constructor(private readonly actions$: Actions) {}
}
