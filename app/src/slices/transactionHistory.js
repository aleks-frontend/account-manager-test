import { createSlice } from '@reduxjs/toolkit';

export const initialState = [];

const transactionHistorySlice = createSlice({
    name: 'transactionHistory',
    initialState,
    reducers: {
        addTransactionHistoryItem: (state, { payload }) => {
            state.push({
                id: payload.id,
                currentBalance: payload.currentBalance
            })
        }
    }
});

// exporting action creators
export const { addTransactionHistoryItem } = transactionHistorySlice.actions;

// exporting state (selector)
export const transactionHistorySelector = state => state;

// exporting reducer (default)
export default transactionHistorySlice.reducer;
