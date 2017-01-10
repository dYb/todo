import crypto = require('crypto')
export interface TodoInterface {
  id?: string
  time?: number
  user?: string
  content: string
  status?: TodoStatus
}
export class Todo implements TodoInterface {
  id: string
  content: string
  user: string
  time?: number
  status?: TodoStatus
  constructor(todo: TodoInterface) {
    this.id = todo.id
    this.content = todo.content
    this.time = todo.time || Date.now()
    this.status = todo.status || TodoStatus.UNDONE
    this.user = todo.user || null
  }
}

const fakeDatabase = {}
const checkDatabase = ((db, id) => {
  const todo = db[id]
  if (!todo) {
    throw new Error('There is no such a todo item with id ' + id)
  }
  return todo
}).bind(null, fakeDatabase)

const Todos = {
  getAll(): Todo[] {
    return Object.keys(fakeDatabase).filter(id => fakeDatabase[id] && !fakeDatabase[id].user).map(id => new Todo(fakeDatabase[id]))
  },
  getByUser(user: string) {
    return Object.keys(fakeDatabase).filter((id) => {
      return fakeDatabase[id] && fakeDatabase[id].user === user
    }).map(id => new Todo(fakeDatabase[id]))
  },
  getById(id: string, user?: string) {
    const todo = fakeDatabase[id]
    if (todo && (!todo.user || todo.user === user)) {
      return new Todo(Object.assign({}, { id }, todo))
    }
    throw new Error('not found id ' + id)
  },
  create(todo: TodoInterface): Todo {
    const id = crypto.randomBytes(10).toString('hex')
    const aTodo = Object.assign({}, todo, {
      time: Date.now()
    })
    fakeDatabase[id] = aTodo
    return new Todo(Object.assign({ id }, aTodo))
  },
  delete(id: string, user: string): boolean | void {
    if (fakeDatabase[id] && user === fakeDatabase[id].user) {
      fakeDatabase[id] = null
      return true
    }
    throw new Error('not allowed delete id ' + id)
  },
  update(todo: TodoInterface): Todo {
    if (todo.user === undefined || todo.user === fakeDatabase[todo.id].user) {
      const _todo = Object.assign({}, todo, {
        time: Date.now()
      })
      fakeDatabase[todo.id] = _todo
      return new Todo(_todo)
    }
    throw new Error('not allowed update id ' + todo.id)
  }
}
const enum TodoStatus {
  UNDONE = 0,
  DONE = 1,
  DELETE = 2
}
export default Todos
