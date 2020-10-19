/*
 * File Created: Sunday, 18th October 2020 1:50:10 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 2:36:40 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { addRecord, loadData } from './app.actions';
import { FormData } from '../typings';

export const initialState: FormData[] = [];

const _formReducer: ActionReducer<FormData[], Action> = createReducer(
  initialState,
  on(addRecord, (state, action) => [...state, action.payload]),
  on(loadData, (state, action) => [...state, ...action.payload])
);

export function formReducer(state: FormData[] | undefined, action: Action): FormData[] {
  return _formReducer(state, action);
}
