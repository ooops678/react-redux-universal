import {combineReducers} from 'redux';
import todoList from './todoReducer';
import levels from './todoLevelReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    todoList,
    levels,
    ajaxCallsInProgress,
    routing: routerReducer
});

export default rootReducer;