// @ts-ignore
import {fetch} from 'react-fetch';
import React from 'react';

interface LoadingProps {
    loadingTime: number;
}

const LoadingWithLateRenderClient: React.FC<LoadingProps> = (props) => {
    const now = new Date();
    console.log(`backend request: ${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`)
    fetch(`http://localhost:4000/sleep/${props.loadingTime}`);

    return (
        <>
            done loading <br />
            {props.children}
        </>
    );
};

export default LoadingWithLateRenderClient;
