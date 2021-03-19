import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors, borderRadius } from '../../services/global-style';
import API from '../../services/API';

const ItemMain = styled.div`
    margin: 20px 0;
    padding: 10px 20px;
    font-size: 12px;
    line-height: 2.3em;
    border: 1px solid ${colors.silver};
    border-radius: ${borderRadius.regular};
    text-align: left;
`;

const Item = ({ id, currentBalance }) => {
    const [transaction, setTransaction] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    
    React.useEffect(() => {
        (async () => {
            // Calling the 'transaction/' endpoint and getting the transaction's account_id and amount
            try {
                const response = await API.get(`transaction/${id}`);            
                const { account_id, amount } = response;
    
                setTransaction({ account_id, amount });
                setLoaded(true);
            } catch(err) {
                console.log(err);
            }
        })();        
    }, []);

    // Render Methods
    const renderTransaction = () => {
        const isWithdrawal = transaction.amount < 0;
        const action = isWithdrawal ? 'Widthdraw' : 'Transfered';
        const direction = isWithdrawal ? 'from' : 'to';
        const prefix = currentBalance < 0 ? '-' : '';
        const { account_id, amount } = transaction;

        return (
            <ItemMain 
                data-type="transaction" 
                data-account-id={account_id}
                data-amount={amount}
                data-balance={currentBalance}>
                <strong>{action} ${Math.abs(amount)}</strong> {direction} <strong>{account_id}</strong><br />
                Current <strong>{account_id}</strong>'s balance is <strong>{prefix}${Math.abs(currentBalance)}</strong>.
            </ItemMain>
        );
    };
    
    return loaded && renderTransaction();
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    currentBalance: PropTypes.number.isRequired
};

export default Item;
