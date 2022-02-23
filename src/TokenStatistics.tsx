import {TokenUsage} from './notestatistics.utils';
import React from 'react';

interface TokenStatisticsProps {
    tokensMostUsed: TokenUsage[];
}

const TokenStatistics = (props: TokenStatisticsProps) => {
    const {tokensMostUsed} = props;
    const colors = ['#FF6600', '#66FF00', '#0066FF'];

    const content = tokensMostUsed.map((item, index) => (
        <div key={item.token}>
            <div
                style={{
                    background: colors[index],
                    height: `${item.num * 10}px`,
                    width: '150px',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    margin: '5px',
                    textAlign: 'center',
                }}>
                {item.num}
            </div>
            <div style={{textAlign: 'center'}}>{item.token}</div>
        </div>
    ));

    return <div style={{display: 'flex', alignItems: 'end'}}>{content}</div>;
};

export default TokenStatistics;
