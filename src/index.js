import expect from 'expect';
//import { createStore } from 'redux';


// implementation of the redux store
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({}); // dummy dispatch

  return { getState, dispatch, subscribe };

};

// simple reducer
function counter(state = 0, action) {
	switch(action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state -1;
		default:
			return state;
	}
}

const store = createStore(counter);

// initial state is 0  
console.log(store.getState());


const render = () => {
	document.body.innerText = store.getState();
}


store.subscribe(render);
// render initial state 0, rerender is in a callback 
render();


document.addEventListener('click', () =>
	store.dispatch({ type: 'INCREMENT'})
);


// tests 

expect(
	counter(0, { type: 'INCREMENT'})
).toEqual(1);

expect(
	counter(1, { type: 'INCREMENT'})
).toEqual(2);

expect(
	counter(2, { type: 'DECREMENT'})
).toEqual(1);

expect(
	counter(1, { type: 'DECREMENT'})
).toEqual(0);

expect (
	counter(22, { type: 'Something'})
).toEqual(22);

expect(
	counter(null, { type: 'INCREMENT'})
).toEqual(1);


console.log('Tests finished ');
