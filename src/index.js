import React from 'react';
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

const AddTodo = ({onAddClick}) => {
	let input;

	return (
		<div>
			<input type="text" 
			       ref={node => {input = node;}} />

			<button onClick={() => {
				onAddClick(input.value);
				input.value = '';
			}}>
				Add Todo
			</button>
		</div>
	);
}


const Todo = ({text, completed, onClick}) => (
	<li onClick={onClick}
	    style={{textDecoration: completed ? 'line-through' : 'none'}} >
	    {text}
	</li>
);


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


const FilterLink = ({filter, currFilter, children, onClick}) => {
	if (filter === currFilter) {
		return <span>{children}</span>;
	}

	return (
		<a href="#" 
		   onClick={e => {
		 		e.preventDefault();
		 		onClick(filter);
		   }}
		 > 
		 	{children}
		 </a>
	);
};


const Footer = ({visibilityFilter, onFilterClick}) => {
	return (
		<p>
			Show:
			{' '}
			<FilterLink 
				filter='SHOW_ALL' 
				currFilter={visibilityFilter}
				onClick={onFilterClick}
			>
				All
			</FilterLink>
			{', '}
			<FilterLink 
				filter='SHOW_ACTIVE' 
				currFilter={visibilityFilter}
				onClick={onFilterClick}
			>
				Active
			</FilterLink>
			{', '}
			<FilterLink 
				filter='SHOW_COMPLETED' 
				currFilter={visibilityFilter}
				onClick={onFilterClick}
			>
				Completed
			</FilterLink>
		</p>
	);
}

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


const TodoApp = ({todos, visibilityFilter}) =>  (		
	<div>
		<h1>Todo App</h1>

		<AddTodo 
			onAddClick={(inText) => {
				store.dispatch({
					type: 'ADD_TODO',
					text: inText,
					id: nextId++
				});
		}}/>

		<TodoList 
			todos={getVisibleTodos(todos, visibilityFilter)}
		    onTodoClick={(id) => {
	          	store.dispatch({
	          		type: 'TOGGLE_TODO',
	          		id: id
	          	});
	         }} />
		
		<Footer 
			visibilityFilter={visibilityFilter} 
			onFilterClick={filter => 
		 		store.dispatch({
		 			type: 'SET_VISIBILITY_FILTER',
		 			filter
		 		})		  
			}
		/>
	</div>
)


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