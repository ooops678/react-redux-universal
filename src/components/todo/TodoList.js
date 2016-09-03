import React, {PropTypes} from 'react';
import TodoListRow from './TodoListRow';

const TodoList = ({todoList}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <td>id</td>
                    <td>target</td>
                    <td>level</td>
                </tr>
            </thead>
            <tbody>
                {todoList.map(todo => 
                    <TodoListRow key={todo.id} todo={todo}/>
                )}
            </tbody>
        </table>
    );
};

TodoList.propTypes = {
    todoList: PropTypes.array.isRequired
};

export default TodoList;