import * as actions from '../actions/warningActions';

export const initialState = false;

export default function warningReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SHOW_WARNING:
            return true;
        case actions.HIDE_WARNING:
            return false;
        default:
            return state;
    }
}