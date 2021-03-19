import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Item from './Item';
import { transactionHistorySelector } from '../../slices/transactionHistory';

const ContainerMain = styled.div`
    margin: 20px 0;
    text-align: center;
`;


const Container = () => {
    const { transactionHistory } = useSelector(transactionHistorySelector);
    return (
        <ContainerMain>
            <h2>Recently submitted transactions</h2>
            {transactionHistory.length !== 0 ?
                transactionHistory
                    .map(transactionHistoryItem => (
                        <Item
                            key={transactionHistoryItem.id}
                            id={transactionHistoryItem.id}
                            currentBalance={transactionHistoryItem.currentBalance} />
                    )).reverse()
                : 'No transactions yet'}
        </ContainerMain>
    )
};

export default Container;
