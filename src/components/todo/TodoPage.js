import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

import * as todoActions from '../../actions/todoAction';
import TodoList from './TodoList';

class TodoPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToTodoPage = this.redirectToTodoPage.bind(this);
    }

    redirectToTodoPage() {
        browserHistory.push('/todo');
    }
    render() {
        const {todoList} = this.props;
        return (
            <div>
                <h1>Todo List</h1>
                <input type="submit" value="Add Todo" className="btn btn-primary" onClick={this.redirectToTodoPage} />
                <TodoList todoList={todoList} />
            </div>
        );
    }
}

TodoPage.propTypes = {
    actions: PropTypes.object.isRequired,
    todoList: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        todoList: state.todoList
    };
}

function mapDispatchProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchProps)(TodoPage);