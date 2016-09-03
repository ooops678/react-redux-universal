import * as types from './actionTypes';
import todoLevelApi from '../api/todoLevelApi';

export function loadLevelsSuccess(levels) {
    return {
        type: types.LOAD_LEVELS_SUCCESS,
        levels
    };
}

export function loadLevels() {
    return function(dispatch) {
        return dispatch(loadLevelsSuccess(todoLevelApi));
    };
}