import * as types from '../actions/actionTypes';

export default function todoReducer(state = [], action) {
    switch(action.type) {
        case types.LOAD_LEVELS_SUCCESS :
            return action.levels;
        default:
            return state;            
    }
}
