import Users, { User } from './model-user'

describe('UserModel',  () => {
  it('should create a user', () => {
    const user = {
      name: 'ybduan',
      password: 'hehe'
    }
    expect(Users.create(user).name).toBeTruthy()
  })
  it('should get a user with name', () => {
    const user = Users.create({
      name: 'hahahah',
      password: 'hehehe'
    })
    expect(Users.getByName('hahahah')).toBeTruthy()
  })
  it('should delete a user with id', () => {
    const user = Users.create({
      name: '123',
      password: 'heheh'
    })
    Users.delete(user.name)
    expect(Users.getByName(user.name)).toBeNull()
  })
  it('should get all users', () => {
    expect(Users.getAll().length).toEqual(2)
  })
  it('should verify a user', () => {
    expect(Users.verify('ybduan', 'hehe')).toEqual(true)
    expect(Users.verify('haha', 'heheh')).toEqual(false)
  })
  it('should remove a user todo item', () => {
    const user = Users.create({
      name: '123',
      password: 'heheh',
      todos: ['aaa', 'bbb']
    })
    user.removeTodo('aaa')
    expect(user.todos.length).toEqual(1)
    expect(user.todos[0]).toEqual('bbb')
  })
})
