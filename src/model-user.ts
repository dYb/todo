import * as crypto from 'crypto' 

export interface UserInterface {
  name: string
  password: string
  todos?: string []
}

export class User implements UserInterface {
  name: string
  password: string
  todos: string[]
  constructor(name, password, todos) {
    this.name = name
    this.todos = todos || []
    this.password = password
  }
  addTodo(todoId: string): void {
    this.todos.push(todoId)
  }
  removeTodo(todoId: string): void {
    this.todos = this.todos.filter(todo => todo !== todoId)
  }
}

const fakeDatabase = {}

const Users = {
  create(user: UserInterface): User {
    if (fakeDatabase[user.name]) {
      throw new Error('user exists')
    }
    fakeDatabase[user.name] = Object.assign({}, user, {
      password: crypto.createHash('md5').update(user.password).digest('hex')
    })
    return new User(user.name, user.password, user.todos)
  },
  getByName(_name: string): User | null {
    const user = fakeDatabase[_name]
    if (user) {
      const { name, password, todos } = user
      return new User(name, password, todos)
    }
    return null
  },
  getAll(): User[] {
    return Object.keys(fakeDatabase).filter(name => fakeDatabase[name]).map((_name) => {
      const { name, password, todos } = fakeDatabase[_name]
      return new User(name, password, todos)
    })
  },
  delete(name: string): void{
    fakeDatabase[name] = null
  },
  verify(_name: string, _password: string): Boolean {
    const user = Users.getByName(_name)
    return !!user && user.password === crypto.createHash('md5').update(_password).digest('hex')
  }
}

export default Users