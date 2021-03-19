import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
                .map(transactionItem => (
                    <Item
                        key={transactionItem.id}
                        id={transactionItem.id}
                        currentBalance={transactionItem.currentBalance} />
                )).reverse()
            : 'No transactions yet'}
    </ContainerMain>
);

Container.propTypes = {
    transactionHistory: PropTypes.array.isRequired
};

export default Container;
