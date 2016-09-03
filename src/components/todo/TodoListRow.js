import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const TodoListRow = ({todo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td><Link to={'/todo/' + todo.id}>{todo.target}</Link></td>
            <td>{todo.level}</td>
        </tr>
    );
};

TodoListRow.propTypes = {
    todo: PropTypes.object.isRequired
};

export default TodoListRow;