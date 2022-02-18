import React, {useEffect, useState} from 'react';

interface LoadingProps {
    loadingTime: number;
}

const LoadingWithDirectRenderClient: React.FC<LoadingProps> = (props) => {
    const [text, setText] = useState('loading');
    useEffect(() => {
        const now = new Date();
        console.log(
            `backend request: ${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`
        );
        fetch(`http://localhost:4000/sleep/${props.loadingTime}`)
          .then(() => setText('done loading'));
    });

    return (
        <>
            {text} <br />
            {props.children}
        </>
    );
};

export default LoadingWithDirectRenderClient;
