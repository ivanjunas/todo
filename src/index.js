import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reducers';
import App from './components/App';

// visibilityFilter will be undefined and show default argument will be used
const persistedState = {
	todos: [
		{id:0, text: 'Welcome Back', completed: true},
		{id:1, text: 'Learn React', completed: false},
		{id:2, text: 'Learn Redux', completed: false}
	],
}

const store = createStore(todoApp, persistedState);

console.log(store.getState());

ReactDOM.render(
	<Provider store={store}> 
		<App />
	</Provider>, 
	document.getElementById('root')
);