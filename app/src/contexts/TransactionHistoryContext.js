import React, { useState, createContext } from 'react';

export const TransactionHistoryContext = createContext();

const TransactionHistoryContextProvider = (props) => {
    const [transactionHistory, setTransactionHistory] = useState([]);

    const addTransactionHistoryItem = ({ id, currentBalance }) => {
        setTransactionHistory([
            ...transactionHistory,
            { id, currentBalance }
        ]);
    };

    return (
        <TransactionHistoryContext.Provider value={{ transactionHistory, addTransactionHistoryItem }}>
            {props.children}
        </TransactionHistoryContext.Provider>
    );
};

export default TransactionHistoryContextProvider;
