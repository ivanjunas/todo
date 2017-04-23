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

class TodoApp  extends Component {

	render() {
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

				<ul>
					{this.props.todos.map((todo) => 
						<li key={todo.id} 
						    onClick={() => {
						    	store.dispatch({
						    		type: 'TOGGLE_TODO',
						    		id: todo.id
						    	});
						    }}
						    style={{textDecoration: todo.completed ? 'line-through' : 'none'}} >
						    {todo.text}
						</li>
					)}
				</ul>
			</div>
		);
	}
}


const render = () => {
	ReactDOM.render(
		<TodoApp todos={store.getState().todos} />, 
		document.getElementById('root')
	);
}

// rerender everytime the state changes 
store.subscribe(render);
// init call 
render();