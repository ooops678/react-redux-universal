import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import TodoPage from './components/todo/TodoPage';
import ManageTodoPage from './components/todo/ManageTodoPage';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="about" component={AboutPage}/>
        <Route path="todos" component={TodoPage}/>
        <Route path="todo" component={ManageTodoPage}/>
        <Route path="todo/:id" component={ManageTodoPage}/>
    </Route>
);