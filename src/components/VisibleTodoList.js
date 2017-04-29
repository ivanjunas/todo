import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';


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

// map redux state to props of the component 
const mapStateToProps = (state) => ({
	todos: getVisibleTodos(state.todos, state.visibilityFilter)
});


// map method to the acctions that should be dispatched to store
const mapDispatchToProps = (dispatch) => ({
	onTodoClick(id) {
		dispatch(toggleTodo(id));
	}
});

// container compoent that subscribe to redux store
// threfore props are taken as a mapping from state 
const VisibleTodoList = connect(
	mapStateToProps, 
	mapDispatchToProps)(TodoList);

export default VisibleTodoList;	