import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';


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

// ------------ React components ----------------------------------------

let nextId = 0;

// 2ns param is context 
let AddTodo = ({ dispatch }) => {
	let input;

	return (
		<div>
			<input type="text" 
			       ref={node => {
			       		input = node;
			       	}} 
			/>

			<button onClick={() => {
				dispatch({
					type: 'ADD_TODO',
					id: nextId++,
					text: input.value
				})
				input.value = '';
			}}>
				Add Todo
			</button>
		</div>
	);
}

AddTodo = connect(
	// state => {
	// 	return {};
	// },
	// when we don't need state its a waste to subscribe to it 
	null,
	// dispatch => {
	// 	return { dispatch };
	// }
	// passing null is just patter to pass down only dispatch 
	null
)(AddTodo);


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


// map redux state to props of the component 
const mapStateTodoToProps = (state) => {
	return {
		todos: getVisibleTodos(state.todos, state.visibilityFilter)
	};
}
// map method to the acctions that should be dispatched to store
const mapDispatchTodoToProps = (dispatch) => {
	return {
		onTodoClick: (id) => {
			dispatch({
				type: 'TOGGLE_TODO',						       
				id: id
			})
		}
	};
}
const VisibleTodoList = connect(mapStateTodoToProps, mapDispatchTodoToProps)(TodoList);



const Link = ({active, children, onClick}) => {
	if (active) {
		return <span>{children}</span>;
	}

	return (
		<a href="#" 
		   onClick={e => {
		 		e.preventDefault();
		 		onClick();
		   }}
		 > 
		 	{children}
		 </a>
	);
};

class FilterLink extends Component {
	componentDidMount() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() => 
			this.forceUpdate()
		);	
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const props = this.props;
		const { store } = this.context;
		const state = store.getState();

		return (
			<Link 
				active={props.filter === state.visibilityFilter}
				onClick={() => {
					store.dispatch({
						type: 'SET_VISIBILITY_FILTER',						       
						filter: props.filter
					})
				}}
			>
				{props.children}
			</Link>
		);
	}
}

FilterLink.contextTypes = {
	store: PropTypes.object
};

const Footer = ({ store }) => {
	return (
		<p>
			Show:
			{' '}
			<FilterLink filter='SHOW_ALL'>All</FilterLink>
			{', '}
			<FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
			{', '}
			<FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
		</p>
	);
}


const TodoApp = ({ store }) =>  (		
	<div>
		<h1>Todo App</h1>

		<AddTodo />
		<VisibleTodoList />
		<Footer />
	</div>
)


ReactDOM.render(
	<Provider store={createStore(todoApp)}> 
		<TodoApp />
	</Provider>, 
	document.getElementById('root')
);