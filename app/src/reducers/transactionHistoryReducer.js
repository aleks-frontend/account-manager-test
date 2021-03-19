import * as actions from '../actions/transactionHistoryActions';

export const initialState = [];

export default function transactionHistoryReducer(state = initialState, action) {
    switch(action.type) {
        case actions.ADD_TRANSACTION_HISTORY_ITEM:
            return [
                ...state,
                {
                    id: action.payload.id, 
                    currentBalance: action.payload.currentBalance
                }
            ]
        default:
            return state;
    }
}
