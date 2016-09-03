import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import * as todoActions from '../../actions/todoAction';
import TodoForm from './TodoForm';

class ManageTodoPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            todo: Object.assign({}, this.props.todo),
            errors: {},
            saving: false
        };

        this.updateTodoState = this.updateTodoState.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.todo.id !== nextProps.todo.id) {
            this.setState({
                todo: Object.assign({}, nextProps.todo)
            });
        }
    }

    updateTodoState(event) {
        const field = event.target.name;
        let todo = this.state.todo;
        todo[field] = event.target.value;
        return this.setState({todo});
    }

    saveTodo(event) {
        event.preventDefault();
        this.setState({saving: true});
        this
            .props
            .actions
            .saveTodo(this.state.todo)
            .then(() => this.redirect())
            .catch(err => {
                toastr.error(err);
                this.setState({saving: false});
            });
    }

    redirect() {
        this.setState({saving: false});
        toastr.success('Todo saved');
        this.context.router.push('/todos');
    }

    render() {
        return (
            <TodoForm
                levels={this.props.levels}
                onChange={this.updateTodoState}
                onSave={this.saveTodo}
                todo={this.state.todo}
                errors={this.state.errors}
                saving={this.state.saving}
            />
        );
    }
}

ManageTodoPage.propTypes = {
    todo: PropTypes.object.isRequired,
    levels: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// pull in the react router context so router is available  on this.context.router
ManageTodoPage.contextTypes = {
    router: PropTypes.object
};

function getTodoById(todoList, id) {
    const todo = todoList.filter(todo => todo.id === id);
    if (todo.length) {
        return todoList[0];
    }
    return null;
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.params.id; // '/todo/:id'
    let todo = {
        id: '',
        target: '',
        level: ''
    };

    if (id && state.todoList.length > 0) {
        todo = getTodoById(state.todoList, id);
    }
    const dropdown = state.levels.map(level => {
        return {
            value: level, 
            text: level
        };
    });
    
    return {
        todo,
        levels: dropdown
    };
}

function mapDispatchProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchProps)(ManageTodoPage);