import Todos, { Todo } from './model-todo'

const todo = {
  user: 'ybduan',
  content: 'this is content'
}

it('should get all todo items', () => {
  const aTodo: Todo = Todos.create(todo)
  Todos.create({
    content: 'heheheh'
  })
  const result = Todos.getAll()
  expect(result.length).toEqual(1)
})

it('should create a todo item', () => {
  const aTodo: Todo = Todos.create(todo)
  expect(aTodo).toBeInstanceOf(Todo)
  expect(aTodo.id).toBeTruthy()
  expect(Todos.getById(aTodo.id, 'ybduan').content).toEqual(todo.content)
  expect(() => {Todos.getById(aTodo.id)}).toThrowError(/not found/)
})


it('should update a todo item', () => {
  const newContent = 'this is new content'
  const aTodo: Todo = Todos.create(todo)
  const anTodo: Todo = Todos.update({ id: aTodo.id, content: newContent, user: 'ybduan' })
  expect(aTodo.id).toEqual(anTodo.id)
  expect(anTodo.content).toEqual(newContent)
  expect(() => { Todos.update({ id: aTodo.id, content: newContent, user: 'hahah' }) }).toThrowError(/update/)
})

it('should delete a todo item', () => {
  const aTodo: Todo = Todos.create(todo)
  const anTodo: Todo = Todos.create(todo)
  const result = Todos.delete(aTodo.id, todo.user)
  expect(result).toEqual(true)
  expect(() => { Todos.delete(anTodo.id, 'haha') }).toThrowError(/delete/) 
})
