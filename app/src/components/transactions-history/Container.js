import React, { useContext } from 'react';
import styled from 'styled-components';

import Item from './Item';
import { TransactionHistoryContext } from '../../contexts/TransactionHistoryContext';

const ContainerMain = styled.div`
    margin: 20px 0;
    text-align: center;
`;

const Container = () => {
    const { transactionHistory } = useContext(TransactionHistoryContext);
    
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
