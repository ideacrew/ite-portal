import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BHSD_FEATURE_KEY, BhsdState } from './bhsd.reducer';

// Lookup the 'Bhsd' feature state managed by NgRx
export const getBhsdState = createFeatureSelector<BhsdState>(BHSD_FEATURE_KEY);

export const getBhsdLoaded = createSelector(
  getBhsdState,
  (state: BhsdState) => state.loaded
);

export const getBhsdError = createSelector(
  getBhsdState,
  (state: BhsdState) => state.error
);

export const getLoadedAndError = createSelector(
  getBhsdLoaded,
  getBhsdError,
  (loaded, error) => ({ loaded, error })
);
