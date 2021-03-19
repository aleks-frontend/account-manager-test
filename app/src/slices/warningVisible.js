import { createSlice } from '@reduxjs/toolkit';

export const initialState = false;

const warningVisibleSlice = createSlice({
    name: 'warningVisible',
    initialState,
    reducers: {
        showWarning: () => true,
        hideWarning: () => false
    }
});

// exporting action creators
export const { showWarning, hideWarning } = warningVisibleSlice.actions;

// exporting the state (selector)
export const warningVisibleSelector = state => state;

// exporting default reducer
export default warningVisibleSlice.reducer;
