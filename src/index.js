import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { combineReducers } from 'redux';


// ------ TODOs reduduers -----------------------------------

const todo = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				id: action.id,
				text: action.text,
				completed: false
			};
		case 'TOGGLE_TODO':			
			if (state.id !== action.id) {
				return state;
			}

			return Object.assign({}, state, {completed: !state.completed });
		
		default:
			return state;	
	}	
};

const todos = (state = [], action) => {
	console.log(action);
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				todo(undefined, action)
			];
		case 'TOGGLE_TODO':
			return state.map(item => todo(item, action));
		default:
			return state;	
	}	
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch(action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	}
};


// es6 - shorthened syntax, reduers has same name as keys of the state 
const todoApp = combineReducers({
	todos,
	visibilityFilter
});

const store = createStore(todoApp);


// ------------ React components ----------------------------------------
let nextId = 0;

const Todo = ({text, completed, onClick}) => {
	return (
		<li onClick={onClick}
		    style={{textDecoration: completed ? 'line-through' : 'none'}} >
		    {text}
		</li>
	);
} 

const TodoList = ({todos, onTodoClick}) => (
	<ul>
		{todos.map(todo => 
			<Todo key={todo.id} 
			      text={todo.text} 
				  completed={todo.completed}
				  onClick={() => onTodoClick(todo.id)} />
		)}
	</ul>
);

const FilterLink = ({filter, currFilter, children}) => {
	if (filter === currFilter) {
		return <span>{children}</span>;
	}

	return (
		<a href="#" 
		   onClick={e => {
		 		e.preventDefault();
		 		store.dispatch({
		 			type: 'SET_VISIBILITY_FILTER',
		 			filter: filter
		 		});
		   }}
		 > 
		 	{children}
		 </a>
	);
};

const getVisibleTodos = (todos, filter) => {
	switch(filter) {
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_COMPLETED':
			return todos.filter(todo => todo.completed);
		case 'SHOW_ACTIVE':
			return todos.filter(todo => !todo.completed);
		default:
			return todos;
	}
}


class TodoApp  extends Component {

	render() {
		// pull objects from props ES6 
		const { todos, visibilityFilter } = this.props;

		const visibleTodos = getVisibleTodos(todos, visibilityFilter);

		return ( 
			<div>
				<h1>Todo App</h1>

				<input type="text" 
				       ref={node => { 
								this.input = node; 
							}} />

				<button onClick={() => {
					store.dispatch({
						type: 'ADD_TODO',
						text: this.input.value,
						id: nextId++
					});
					this.input.value = '';
				}}>
					Add Todo
				</button>

				<TodoList todos={visibleTodos}
				          onTodoClick={(id) => {
				          	store.dispatch({
				          		type: 'TOGGLE_TODO',
				          		id: id
				          	});
				          }} />
				
				<p>
					Show:
					{' '}
					<FilterLink filter='SHOW_ALL' currFilter={visibilityFilter}>All</FilterLink>
					{' '}
					<FilterLink filter='SHOW_ACTIVE' currFilter={visibilityFilter}>Active</FilterLink>
					{' '}
					<FilterLink filter='SHOW_COMPLETED' currFilter={visibilityFilter}>Completed</FilterLink>
				</p>
			</div>
		);
	}
}


const render = () => {
	ReactDOM.render(
		<TodoApp {...store.getState()} />, 
		document.getElementById('root')
	);
}

// rerender everytime the state changes 
store.subscribe(render);
// init call 
render();