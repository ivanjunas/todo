import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reducers';
import App from './components/App';
import { loadState, saveState} from './localStorage';
import  throttle from 'lodash/throttle';

const persistedState = loadState();

const store = createStore(todoApp, persistedState);

// protect serialization just one time per second
store.subscribe(throttle(
	() => {
		saveState({
			todos: store.getState().todos
		});
	}, 
	1000)
);

ReactDOM.render(
	<Provider store={store}> 
		<App />
	</Provider>, 
	document.getElementById('root')
);