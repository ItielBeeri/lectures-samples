import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ModuleState } from './state';
import memoize from 'lodash.memoize';

export const selectModuleState = createFeatureSelector<ModuleState>('module');

export const selectA = createSelector(selectModuleState, (s) => s.a);

export const selectAA = createSelector(selectA, (a) => {
  console.info(`in selectAA`, this);
  return a.aa;
});

export interface VM {
  date: Date;
  fixedProp: string;
  aaElement: string;
}

export const selectVM = memoize((index: number) => createSelector(
  selectAA,
  (aa) => {
    console.info(`in selectVM. index: ${index}`);
    return {
      date: new Date(),
      fixedProp: 'blah',
      aaElement: aa[index],
    };
  }
));
