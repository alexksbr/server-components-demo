/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {createContext, Dispatch, SetStateAction, useContext} from 'react';
import {ISidebarLocation} from './types';

export const SidebarLocationContext = createContext<{
    sidebarLocation: ISidebarLocation;
    setSidebarLocation?: Dispatch<SetStateAction<ISidebarLocation>>;
}>({
    sidebarLocation: {
        searchText: '',
        filterFavorites: false,
    },
});
export function useSidebarLocation() {
    return useContext(SidebarLocationContext);
}
