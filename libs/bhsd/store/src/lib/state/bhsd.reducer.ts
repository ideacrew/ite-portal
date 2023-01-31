/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { createReducer, on, Action } from '@ngrx/store';

import * as BhsdActions from './bhsd.actions';
export const BHSD_FEATURE_KEY = 'bhsd';

export type BhsdState = {
  loaded: boolean; // has the Bhsd list been loaded
  error?: string; // last known error (if any)
};

export interface BhsdPartialState {
  readonly [BHSD_FEATURE_KEY]: BhsdState;
}

export const initialBhsdState: BhsdState = {
  loaded: false,
  error: 'no error',
};

const reducer = createReducer(
  initialBhsdState,
  on(BhsdActions.initBhsd, (state) => ({
    ...state,
    loaded: true,
  }))
);

export function bhsdReducer(state: BhsdState | undefined, action: Action) {
  return reducer(state, action);
}
