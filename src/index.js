import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze';


const toggleTodo = (todo) => {
	// 1. mutation of the object 
	//todo.completed = !todo.completed;
	//return todo;

	// 2. create a new object  
	// return {
	// 	id: todo.id,
	// 	text: todo.text,
	// 	completed: !todo.completed
	// };

	// new in ES6
	return Object.assign({}, todo, {completed: !todo.completed });

	// ES7
	// return {
	// 	...todo,
	// 	completed:, !todo.completed
	// };
}

const testToggleTodo = function() {
	const todoBefore = {
		id: 0,
		text: 'Learn Redux',
		completed: false
	};
	const todoAfter = {
		id: 0,
		text: 'Learn Redux',
		completed: true
	};

	deepFreeze(todoBefore);

	expect(
		toggleTodo(todoBefore)
	).toEqual(todoAfter);
};


testToggleTodo();


const addCounter = (list) => {
	// list.push(0);
	// return list; 
	return [...list, 0];
};

const removeCounter = (list, idx) => {
	// list.splice(idx, 1);
	// return list;
	return [
		...list.slice(0, idx),
		...list.slice(idx + 1)
		];
};

const incrementCounter = (list, idx) => {
	// reutrn list[idx]++;
	// list.concat(list[idx] + 1); // variant instead of spread operator
	return [
		...list.slice(0, idx),
		list[idx] + 1,
		...list.slice(idx + 1)		
	];
};

// Tests - using deep freeze to avoid mutations 

// test state is not mutated 
const testAddCounter = function() {
	const listBefore = [];
	const listAfter = [0];

	deepFreeze(listBefore);

	expect(
		addCounter(listBefore)
	).toEqual(listAfter);
}

const testRemoveCounter = () => {
	const listBefore = [0, 10, 20];
	const listAfter = [0, 20];

	deepFreeze(listBefore);

	expect(
		removeCounter(listBefore, 1)
	).toEqual(listAfter);
}

const testIncrementCounter = () => {
	const listBefore = [0, 10, 20];
	const listAfter = [0, 11, 20];

    deepFreeze(listBefore);
    
	expect(
		incrementCounter(listBefore, 1)
	).toEqual(listAfter);
}

testAddCounter();
testRemoveCounter();
testIncrementCounter();

console.log('All tests passed!');


//----------------------------------------------------------------------------

// 1.) simple reducer
function counter(state = 0, action) {
	//console.log(action.type);

	switch(action.type) {			
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}


// 2.) react component  
const Counter = ( { value, onIncrement, onDecrement } ) => {	
	return (
		<div> 
			<h1>{ value }</h1>
			<button onClick={onIncrement}>+</button>
			<button onClick={onDecrement}>-</button>
		</div>
	);
}


// 3.) create redux store API method, pass in reducer 
const store = createStore(counter);


// 4.) render function - central point to rerender Counter App
const render = function() {
	ReactDOM.render(
		<Counter 
			value={ store.getState() } 
			onIncrement={ () => store.dispatch({type: 'INCREMENT'}) }
			onDecrement={ () => store.dispatch({type: 'DECREMENT'}) }
			/>,
		document.getElementById('root')
	); 
}


// 5.) render function is called everytime state gets changed 
store.subscribe(render);

// initail render to display app 
render();

