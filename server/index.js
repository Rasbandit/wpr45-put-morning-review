const express = require('express');

const app = express();

app.use(express.json());

let todos = [{ todo: 'get dog', id: 0, done: false }, { todo: 'get cat', id: 1, done: true }];
let id = 2;

app.get('/api/todo', (req, res) => {
  res.send(todos);
})

app.put('/api/todo/complete/:id', (req, res) => {
  todos = todos.map((todo) => {
    if(todo.id === +req.params.id) {
      todo.done = !todo.done
    }
    return todo
  })
  res.send(todos)
})

app.put('/api/todo/edit/:id', (req, res) => {
  const {id} = req.params;
  const {todo} = req.body;
  todos = todos.map((item) => {
    if(item.id === +id) {
      item.todo = todo;
    }
    return item
  })
  res.send(todos)
})

app.post('/api/todo', (req, res) => {
  const newTodo = req.body;
  newTodo.id = id++;
  newTodo.done = false;
  todos.push(newTodo);
  res.send(todos)
})

app.delete('/api/todo/:id', (req, res) => {
  const {id} = req.params;
  todos = todos.filter(todo => todo.id !== +id)
  res.send(todos)
})

app.listen(4000, () => console.log('4000 ducks marching on rome'));