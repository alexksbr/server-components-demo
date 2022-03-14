/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// @ts-ignore
import {unstable_getCacheForType, unstable_useCacheRefresh} from 'react';
// @ts-ignore
import {createFromFetch} from 'react-server-dom-webpack';
import {ILocation, ISidebarLocation, LocationCache, Response} from './types';

function createResponseCache(): LocationCache {
    return new Map<string, Response>();
}

export function useRefresh() {
    const refreshCache = unstable_useCacheRefresh();
    return function refresh(key: string, seededResponse: ILocation) {
        refreshCache(createResponseCache, new Map([[key, seededResponse]]));
    };
}

export function useServerResponse(location: ILocation) {
    const key = JSON.stringify(location);
    const cache = unstable_getCacheForType(
        createResponseCache
    ) as LocationCache;
    let response = cache.get(key);
    if (response !== undefined) {
        return response;
    }
    const fetchResponse = createFromFetch(
        fetch('/react?location=' + encodeURIComponent(key))
    ) as Response;
    cache.set(key, fetchResponse);
    return fetchResponse;
}

export function useSidebarServerResponse(location: ISidebarLocation) {
    const key = JSON.stringify(location);
    const cache = unstable_getCacheForType(
      createResponseCache
    ) as LocationCache;
    let response = cache.get(key);
    if (response !== undefined) {
        return response;
    }
    const fetchResponse = createFromFetch(
      fetch('/sidebar?sidebarlocation=' + encodeURIComponent(key))
    ) as Response;
    cache.set(key, fetchResponse);
    return fetchResponse;
}
