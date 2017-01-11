const jwt = require('koa-jwt')
import Koa = require('koa')
import * as co from 'co'
import * as bodyParse from 'koa-bodyparser'
import koaBody = require('koa-body')
import router, { SECRET_KEY } from './routes'

const app = new Koa()

app
  .use(koaBody())
  .use(jwt({
    secret: SECRET_KEY,
    passthrough: true
  }))
  .use(router.routes())
  .use(router.allowedMethods())

export default app