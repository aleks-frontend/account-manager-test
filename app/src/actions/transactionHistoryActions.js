export const ADD_TRANSACTION_HISTORY_ITEM = 'ADD_TRANSACTION_HISTORY_ITEM';

export const addTransactionHistoryItem = ({ id, currentBalance }) => ({
    type: ADD_TRANSACTION_HISTORY_ITEM,
    payload: { id, currentBalance }
});
