import { Request } from 'koa'
import { graphiqlKoa } from 'graphql-server-koa'
import * as Router from 'koa-router'
import { sign, verify, decode} from 'jsonwebtoken'
import Todos, { TodoInterface } from './model-todo'
import Users, { UserInterface } from './model-user'

export const SECRET_KEY = 'NETEASE'

const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'hello world'
  ctx.status = 200
})

// User routes
router.post('/user', async (ctx) => {
  const { name, password } = ctx.request.body
  if (!name || !password) {
    ctx.body = 'err'
    ctx.status = 406
    return 
  }
  try {
    ctx.body = Users.create({ name, password })
  } catch(err) {
    ctx.body = err.message
    ctx.status = 403
  }
})

// Login
router.post('/login', async (ctx) => {

  const { name, password } = ctx.request.body
  const result = Users.verify(name, password)
  if (result) {
    ctx.body = {
      status: 'success',
      token: sign({ name }, SECRET_KEY, { expiresIn: 60 * 60 * 5 })
    }
  } else {
    ctx.body = {
      status: 'fail'
    }
  }
})

// Todo routes

router.get('/todos', async (ctx) => {
  ctx.body = Todos.getAll()
})

router.get('/todo/:id', async (ctx) => {
  try {
    ctx.body = Todos.getById(ctx.params.id)
  } catch(err) {
    ctx.body = err
    ctx.status = 500
  }
})

router.patch('/todo/:id', async (ctx) => {
  const id = ctx.params.id
  const { content, user } = ctx.request.body
  ctx.body = Todos.update({ content, id, user })
  ctx.status = 201
})

router.post('/todo', async (ctx) => {
  const content = ctx.request.body.content
  if (!content) {
    ctx.status = 406
    ctx.body = 'Not found content field'
    return
  }
  ctx.body = Todos.create({ content })
  ctx.status = 201
})

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))


export default router