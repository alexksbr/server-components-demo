/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {createContext, Dispatch, SetStateAction, useContext} from 'react';
import {IFilterSettings, ILocation} from './types';

export const FilterSettingsContext = createContext<{
  filterSettings: IFilterSettings;
  setFilterSettings?: Dispatch<SetStateAction<IFilterSettings>>;
}>({
  filterSettings: {
    searchText: '',
    filterFavorites: false,
  },
});

export function useFilterSettings() {
  return useContext(FilterSettingsContext);
}
