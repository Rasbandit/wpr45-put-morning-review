import React, { Component } from 'react'
import axios from 'axios';

export default class Todo extends Component {
  constructor() {
    super();

    this.state = {
      edit: false,
      input: ''
    }
  }

  completeTodo(id) {
    axios.put(`/api/todo/complete/${id}`).then(this.props.updateTodos)
  }

  editTodo() {
    axios.put(`/api/todo/edit/${this.props.id}`, { todo: this.state.input }).then(this.props.updateTodos)
    this.setState({ edit: false })
  }

  deleteTodo(id) {
    axios.delete(`/api/todo/${id}`).then(this.props.updateTodos)
  }

  render() {
    console.log(this.props)
    return (
      <div>

        {
          this.state.edit
            ? (
              <div>
                <input value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} />
                <button onClick={() => { this.editTodo() }}>
                  Save
                </button>
              </div>
            )
            : (
              <div>
                <h5 className={this.props.done ? 'done' : ''}>
                  {this.props.text}
                </h5>
                <button onClick={() => { this.setState({ edit: true }) }}>
                  Edit
                </button>
              </div>
            )

        }

        <button onClick={() => { this.completeTodo(this.props.id) }}>
          {this.props.done ? 'UnDone' : 'Done'}
        </button>
        <button onClick={() => this.deleteTodo(this.props.id)}>
          Delete
        </button>
      </div >
    )
  }
}
