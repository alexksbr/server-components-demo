/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {createContext, Dispatch, SetStateAction, useContext} from 'react';
import {ILocation} from './types';

// 🖌 TODO: we have to store the fact if we are currently filtering the list in our context.
// Add a new boolean field filterFavorites to the context and fix all compile errors. Start with adapting the type definition in types.ts
// 🖌 TODO: afterwards, let's implement the filter functionality. To do that, let's go to FilterButton.tsx
export const LocationContext = createContext<{
    location: ILocation;
    setLocation?: Dispatch<SetStateAction<ILocation>>;
}>({
    location: {
        selectedId: null,
        isEditing: false,
        searchText: '',
        showStatistics: false,
    },
});
export function useLocation() {
    return useContext(LocationContext);
}
