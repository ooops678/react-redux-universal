import * as types from '../actions/actionTypes';

export default function todoReducer(state = [], action) {
    switch(action.type) {
        case types.LOAD_LEVELS_SUCCESS :
            return action.todoList;
        case types.CREATE_TODO_SUCCESS :
            return [
                ...state, Object.assign({}, action.todo)
            ];
        case types.UPDATE_TODO_SUCCESS :
            return [...state].map(todo => {
                if (todo.id === action.todo.id) {
                    return action.todo;
                }
                return todo;
            });            
        default:
            return state;            
    }
}