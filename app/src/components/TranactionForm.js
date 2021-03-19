import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { isValidUUID } from '../services/helpers';
import { colors, borderRadius } from '../services/global-style';
import API from '../services/API';

// Importing action creators
import { showWarning, hideWarning } from '../actions/warningActions';
import { addTransactionHistoryItem } from '../actions/transactionHistoryActions';

const TransactionFormMain = styled.form`
    margin: 0 0 40px;
    padding: 10px 20px 20px;
    border: 1px solid ${colors.blue};
    border-radius: 10px;
    text-align: left;
`;

const TransactionFormWrapper = styled.div`
    position: relative;
    text-align: center;
`;

const TransactionFormGroup = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin: 10px 0;

    &::before {
        content: 'Invalid input data';
        display: ${props => props.invalid ? 'block' : 'none'};
        position: absolute;
        top: 1px;
        right: 0;
        padding: 5px;
        font-size: 10px;        
        color: ${colors.red};
        background: #fff;
        border: 1px solid ${colors.red};
        transform: translateY(-100%);
    }

    input[type="text"] {
        flex: 1;
        border: 1px solid ${props => props.invalid ? colors.red : 'black'};
    }
`;

const TransactionFormLabel = styled.label`
    margin-right: 5px;
    font-size: 12px;
    color: ${colors.blue};
`;

const TransactionFormGenerateButton = styled.button`
    width: 100%;
    padding: 5px;
    font-size: 10px;
    color: #fff;
    background: ${colors.blue};
    border: none;
    border-radius: ${borderRadius.small};
    text-align: center;

    &:hover { cursor: pointer; }
`;

const TransactionForm = ({ dispatch }) => {
    const initialInputData = {
        account_id: '',
        amount: '',
    };

    // Setting up local states
    const [inputData, setInputData] = React.useState(initialInputData);
    const [lastTransactionData, setLastTransactionData] = React.useState({});
    const [invalidInputs, setInvalidInputs] = React.useState({
        account_id: false,
        amount: false
    });

    // Grabbing data from Context
    const handleInputChange = e => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value
        })
    };

    // Event handlers
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const { account_id } = inputData;
        const amount = Number(inputData['amount']);
        
        // Helper function for reseting all form inputs
        const resetForm = () => setInputData(initialInputData);

        // Checking if the duplicate transaction was submitted in previous 5 seconds
        if ( lastTransactionData ) {            
            const isTooFast = Date.now() - lastTransactionData.timeStamp < 5000;
            const isDuplicate = (account_id === lastTransactionData.account_id) && (amount === Number(lastTransactionData.amount));

            if (isTooFast && isDuplicate) {
                resetForm();
                return dispatch(showWarning());
            }
        }


        const transaction_id = uuidv4();
        let invalidInputsCopy = { ...invalidInputs };

        // Account ID validation
        if (!isValidUUID(account_id) || !account_id) {
            invalidInputsCopy = {
                ...invalidInputsCopy,
                account_id: true
            };
        } else {
            invalidInputsCopy = {
                ...invalidInputsCopy,
                account_id: false
            };
        }

        // Amount validation 
        if (isNaN(amount) || !amount) {
            invalidInputsCopy = {
                ...invalidInputsCopy,
                amount: true
            };
        } else {
            invalidInputsCopy = {
                ...invalidInputsCopy,
                amount: false
            };
        }

        setInvalidInputs(invalidInputsCopy);

        // Checking if either account id or amount inputs were filled with invalid data type
        // using the copy of the state because the setState is happening in asynchronous way
        // so this if statement wouldn't work with the actual state 
        if (invalidInputsCopy.account_id || invalidInputsCopy.amount) return;


        // Calling the 'amount/' endpoint and sending the new transaction to backend
        API.post({
            endpoint: 'amount',
            body: JSON.stringify({ account_id, amount }),
            params: { 'transaction-id': transaction_id }
        })
            .then(() => {
                // Reseting the form after submit
                resetForm();

                // Calling the 'balance' endpoint to get the current balance
                // and adding both new transaction ID and the current account balance 
                // to the 'lastTransactionData' state
                API.get(`balance/${account_id}`)
                    .then((result) => {
                        dispatch(addTransactionHistoryItem({
                            id: transaction_id, 
                            currentBalance: result['balance'],                             
                        }));  
                        
                        setLastTransactionData({
                            timeStamp: new Date().getTime(), 
                            account_id, 
                            amount
                        });

                        dispatch(hideWarning());
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch(() => {
                alert('There is some issue with the server, please try again later.');
            })
    };

    // Helper function for generating the random account ID
    // and setting the account ID input's value with it
    const handleGenerateIdClick = () => {
        setInputData({
            ...inputData,
            account_id: uuidv4()
        });
    };

    return (
        <TransactionFormWrapper>
            <h2>Submit new transaction</h2>
            <TransactionFormMain onSubmit={handleFormSubmit} data-type="transaction-form">
                <TransactionFormGenerateButton
                    type="button"
                    onClick={handleGenerateIdClick}>
                    Generate Account ID
                </TransactionFormGenerateButton>
                <TransactionFormGroup invalid={invalidInputs.account_id}>
                    <TransactionFormLabel>Account ID:</TransactionFormLabel>
                    <input
                        type="text"
                        value={inputData.account_id}
                        name="account_id"
                        data-type="account-id"
                        onChange={handleInputChange} />
                </TransactionFormGroup>
                <TransactionFormGroup invalid={invalidInputs.amount}>
                    <TransactionFormLabel>Amount:</TransactionFormLabel>
                    <input
                        type="text"
                        value={inputData.amount}
                        name="amount"
                        data-type="amount"
                        onChange={handleInputChange} />
                </TransactionFormGroup>
                <button type="submit">Submit</button>
            </TransactionFormMain>
        </TransactionFormWrapper>
    );
};

export default connect(null)(TransactionForm);
