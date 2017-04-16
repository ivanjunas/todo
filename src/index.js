import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';


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

