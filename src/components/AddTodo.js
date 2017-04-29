import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';


// 1st param is props, 2nd param is context 
const AddTodo = ({ dispatch }) => {
	let input;

	return (
		<div>
			<input type="text" 
			       ref={node => {
			       		input = node;
			       	}} 
			/>

			<button onClick={() => {
				dispatch(addTodo(input.value))
				input.value = '';
			}}>
				Add Todo
			</button>
		</div>
	);
}

// container component, not state with dispatch function
export default connect()(AddTodo);