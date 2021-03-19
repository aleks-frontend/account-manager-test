import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Item from './Item';

const ContainerMain = styled.div`
    margin: 20px 0;
    text-align: center;
`;

const Container = ({ transactionHistory }) => (
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
);

const mapStateToProps = state => ({
    transactionHistory: state.transactionHistory
});

export default connect(mapStateToProps)(Container);
