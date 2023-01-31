import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromBhsd from './state/bhsd.reducer';
import { BhsdEffects } from './state/bhsd.effects';
import { BhsdFacade } from './state/bhsd.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromBhsd.BHSD_FEATURE_KEY, fromBhsd.bhsdReducer),
    EffectsModule.forFeature([BhsdEffects]),
  ],
  providers: [BhsdFacade],
})
export class BhsdStoreModule {}
