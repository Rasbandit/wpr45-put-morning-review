import React, { Component } from 'react';
import axios from 'axios';
import Todo from './Todo'
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      input: ''
    }

    this.updateTodos = this.updateTodos.bind(this)
  }

  componentDidMount() {
    axios.get('/api/todo').then(this.updateTodos)
  }

  updateTodos(response) {
    this.setState({ todos: response.data })
  }

  addTodo() {
    axios.post('/api/todo', { todo: this.state.input }).then(this.updateTodos)
    this.setState({ input: '' })
  }

  render() {

    const todos = this.state.todos.map((todo) => {
      return <Todo
        text={todo.todo}
        id={todo.id}
        done={todo.done}
        updateTodos={this.updateTodos}
        key={todo.id}
      />
    })

    return (
      <div className="App" >
        <header className="App-header">
          <h2>Add Todo</h2>
          <input onChange={(e) => { this.setState({ input: e.target.value }) }} />
          <button onClick={() => { this.addTodo() }}>Add Todo</button>
          {todos}
        </header>
      </div>
    );
  }
}

export default App;
