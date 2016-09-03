import * as types from './actionTypes';
import todoListApi from '../api/todoListApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

function loadTodosSuccess(todoList) {
    return {
        type: types.LOAD_TODOS_SUCCESS,
        todoList
    };
}

function updateTodoSuccess(todo) {
    return {
        type: types.UPDATE_TODO_SUCCESS,
        todo
    };
}

function createTodoSuccess(todo) {
    return {
        type: types.CREATE_TODO_SUCCESS,
        todo
    };
}

export function loadTodoList() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return todoListApi.getAllTodo().then(todoList => {
            dispatch(loadTodosSuccess(todoList));
        }).catch(error => {
            throw(error);
        });
    };
}

export function saveTodo(todo) {
    return function(dispatch, getState) {
        dispatch(beginAjaxCall());
        return todoListApi.saveTodo(todo).then(savedTodo => {
            todo.id? dispatch(updateTodoSuccess(savedTodo)): dispatch(createTodoSuccess(savedTodo));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}