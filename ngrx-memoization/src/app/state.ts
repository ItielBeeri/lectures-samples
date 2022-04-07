import { Action, createAction, createReducer, on, props } from '@ngrx/store';
import produce from 'immer';

export interface ModuleState {
  a: {
    aa: string[];
    ab: string;
  };
  b: string;
}

export const changeAA = createAction('change aa', props<{ aa: string }>());
export const changeAB = createAction('change ab', props<{ ab: string }>());
export const changeB = createAction('change b', props<{ b: string }>());

const initialState: ModuleState = {
  a: {
    aa: ['inital aa element'],
    ab: 'initial ab',
  },
  b: 'initial b',
};

const reducer = createReducer(
  initialState,
  on(
    changeAA,
    produce((draft, action) => {
      draft.a.aa.push(action.aa);
    })
  ),
  on(
    changeAB,
    produce((draft, action) => {
      draft.a.ab = action.ab;
    })
  ),
  on(
    changeB,
    produce((draft, action) => {
      draft.b = action.b;
    })
  ),
);

export function reduce(state: ModuleState | undefined, action: Action): ModuleState {
    return reducer(state, action);
}

export interface GlobalState {
    module: ModuleState;
}