/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useState, Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';

import {useServerResponse, useSidebarServerResponse} from './Cache.client';
import {LocationContext} from './LocationContext.client';
import {SidebarLocationContext} from './SidebarLocationContext.client';
import {ILocation, ISidebarLocation} from './types';
import SearchField from './SearchField.client';
import FilterButtonClient from './FilterButton.client';
import EditButton from './EditButton.client';

const SidebarRoot = () => {
    return (
        <Suspense fallback={null}>
            <ErrorBoundary FallbackComponent={Error}>
                <Content />
            </ErrorBoundary>
        </Suspense>
    );
};

const Content = () => {
    const [sidebarLocation, setSidebarLocation] = useState<ISidebarLocation>({
        searchText: '',
        filterFavorites: false,
    });
    const response = useSidebarServerResponse(sidebarLocation);
    return (
        <SidebarLocationContext.Provider
            value={{sidebarLocation, setSidebarLocation}}>
            <section className="sidebar-menu" role="menubar">
                <SearchField />
                <FilterButtonClient />
                <EditButton noteId={null}>New</EditButton>
            </section>
            {response.readRoot()}
        </SidebarLocationContext.Provider>
    );
};

interface ErrorProps {
    error: Error;
}

const Error: React.FC<ErrorProps> = ({error}) => {
    return (
        <div>
            <h1>Application Error</h1>
            <pre style={{whiteSpace: 'pre-wrap'}}>{error.stack}</pre>
        </div>
    );
};

export default SidebarRoot;
