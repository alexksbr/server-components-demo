/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useState} from 'react';
import NoteList from './NoteList.server';
import {IFilterSettings} from './types';
import {FilterSettingsContext} from './FilterSettingsContext.client';
import {
    useFilterSettingsServerResponse,
    useLocationServerResponse,
} from './Cache.client';
import SearchField from './SearchField.client';
import FilterButton from './FilterButton.client';
import EditButton from './EditButton.client';

const ClientApp: React.FC = () => {
    const [filterSettings, setFilterSettings] = useState<IFilterSettings>({
        searchText: '',
        filterFavorites: false,
    });

    const response = useFilterSettingsServerResponse(filterSettings);

    return (
        <FilterSettingsContext.Provider
            value={{filterSettings, setFilterSettings}}>
            <section className="sidebar-menu" role="menubar">
                <SearchField />
                <FilterButton />
                <EditButton noteId={null}>New</EditButton>
            </section>
            {response.readRoot()}
        </FilterSettingsContext.Provider>
    );
};

export default ClientApp;
