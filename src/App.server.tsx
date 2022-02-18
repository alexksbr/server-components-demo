/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, {Suspense} from 'react';
import LoadingWithDirectRenderClient from './LoadingWithDirectRender.client';
import LoadingWithLateRenderClient from './LoadingWithLateRender.client';
import Loading from './Loading.server';

const App: React.FC = () => {
    return (
        <div className="main">
            {/*Bad user experience*/}
            <LoadingWithDirectRenderClient loadingTime={2000}>
                <LoadingWithDirectRenderClient loadingTime={4000} />
                <LoadingWithDirectRenderClient loadingTime={1000} />
            </LoadingWithDirectRenderClient>

            {/*Client-Server waterfall*/}
            {/*            <LoadingWithLateRenderClient loadingTime={2000}>
                <LoadingWithLateRenderClient loadingTime={4000} />
                <LoadingWithLateRenderClient loadingTime={1000} />
            </LoadingWithLateRenderClient>*/}

            {/*Solving the problem using a Server component: the component and
            hence the waterfall now live on the server side*/}
            {/*            <Suspense fallback={<div>Loading</div>}>
                <Loading loadingTime={2000}>
                    <Loading loadingTime={4000} />
                    <Loading loadingTime={1000} />
                </Loading>
            </Suspense>*/}
        </div>
    );
};

export default App;
