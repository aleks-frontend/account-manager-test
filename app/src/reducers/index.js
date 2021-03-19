import { combineReducers } from 'redux';
import warningReducer from './warningReducer';
import transactionHistoryReducer from './transactionHistoryReducer';

const rootReducer = combineReducers({
   warningVisible: warningReducer,
   transactionHistory: transactionHistoryReducer
});
 
export default rootReducer;
