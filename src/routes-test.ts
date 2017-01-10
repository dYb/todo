import app from './app'
const request = require('supertest')
describe('Todo Routing', () => {
  let id :string = ''
  const content = 'This is a todo content'
  it('GET / should return "hello world"', async () => {
    await request(app.listen())
      .get('/')
      .expect('hello world')
  })
  it('POST /todo should create a new todo item', async () => {
    await request(app.listen())
      .post('/todo')
      .expect(406, 'Not found content field')
    await request(app.listen())
      .post('/todo')
      .send({ content })
      .expect(201)
      .expect((res) => {
        id = res.body.id
        expect(res.body.content).toEqual(content)
      })
  })
  it('GET /todo/:id should return a todo item', async () => {
    await request(app.listen())
      .get('/todo/' + id)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toEqual(id)
        expect(res.body.content).toEqual(content)
      })
  })
  it('PATCH /todo/:id should update specific todo item', async () => {
    await request(app.listen())
      .patch('/todo/' + id)
      .send({ content: 'new content' })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toEqual(id)
        expect(res.body.content).toEqual('new content')
      })

  })
  it('GET /todos should return all todos', async () => {
    await request(app.listen())
      .get('/todos')
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.length).toEqual(1)
      })
      .expect(200)
  })
})

describe('User Routing', () => {
  it('POST /user should create a new user', async () => {
    await request(app.listen())
      .post('/user')
      .send({ name: 'ybduan', password: '123456' })
      .expect((res) => {
        expect(res.body.name).toEqual('ybduan')
      })
    await request(app.listen())
      .post('/user')
      .expect((res) => {
        expect(res.status).toEqual(406)
      })
    await request(app.listen())
      .post('/user')
      .send({ name: 'ybduan', password: '12345' })
      .expect((res) => {
        expect(res.status).toEqual(403)
      })
  })

  it('POST /login should return success when passing right name and password', async () => {
    await request(app.listen())
      .post('/login')
      .send({ name: 'ybduan', password: '123456' })
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toEqual('success')
        expect(res.body.token).toBeTruthy()
      })
  })
  it('POST /login should return fail when passing wrong name and password', async() => {
    await request(app.listen())
      .post('/login')
      .send({})
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toEqual('fail')
      })
  })

})