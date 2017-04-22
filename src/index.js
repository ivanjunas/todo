// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze';


// ------ TODOs reduduer ----------------------------

const todos = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			];
		case 'TOGGLE_TODO':
			return state.map(todo => {
				if (todo.id !== action.id) {
					return todo;
				}
				// toggle todo for given id 
				return Object.assign({}, todo, {completed: !todo.completed });
			});
		default:
			return state;	
	}	
}


const testAddTodo = function() {
	const stateBefore = [];
	const action = {
		type: 'ADD_TODO',
		id: 0,
		text: 'Learn REDUX'
	};
	const stateAfter = [
		{
			id: 0,
			text: 'Learn REDUX',
			completed: false
		}
	];

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(
		todos(stateBefore, action)
	).toEqual(stateAfter);

};


const testToggleTodo = function() {
	const stateBefore = [
		{
			id: 0,
			text: 'Learn Redux',
			completed: false
		},
		{
			id: 1,
			text: 'Go for dinner',
			completed: false
		}
	];
	const action = {
		type: 'TOGGLE_TODO',
		id: 0
	}
	const stateAfter = [
		{
			id: 0,
			text: 'Learn Redux',
			completed: true
		},
		{
			id: 1,
			text: 'Go for dinner',
			completed: false
		}
	];

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(
		todos(stateBefore, action)
	).toEqual(stateAfter);
}


testAddTodo();
testToggleTodo();

console.log('All tests pased!');