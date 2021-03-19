import { combineReducers } from 'redux';
import warningReducer from './warningVisible';
import transactionHistoryReducer from './transactionHistory';

const rootReducer = combineReducers({
   warningVisible: warningReducer,
   transactionHistory: transactionHistoryReducer
});
 
export default rootReducer;
