import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

// es6 - shorthened syntax
// reduers has same name as keys of the state 
const todoApp = combineReducers({
	todos,
	visibilityFilter
});

export default todoApp;