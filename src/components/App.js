import React from 'react';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';


const App = () =>  (		
	<div>
		<h1>Todo App</h1>

		<AddTodo />
		<VisibleTodoList />
		<Footer />
	</div>
)

export default App;