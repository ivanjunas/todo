// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze';


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

			return Object.assign({}, state, {completed: !todo.completed });
		
		default:
			return state;	
	}	
}

const todos = (state = [], action) => {
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
}

//-------- Tests --------------------------------------------

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