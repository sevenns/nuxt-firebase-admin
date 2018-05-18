'use strict'

import Router from 'koa-trie-router'
import signin from './routes/signin'
import signout from './routes/signout'

const router = new Router()

export default () => {
  router.post(signin())
  router.post(signout())

  return router.middleware()
}
