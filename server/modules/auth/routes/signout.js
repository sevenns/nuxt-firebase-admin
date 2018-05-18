'use strict'

import Router from 'koa-trie-router'
import controller from '../controllers/signout'

const router = new Router()

export default () => {
  router.post('/signout', async (context, next) => {
    let result

    try {
      result = await controller(context)
    } catch (error) {
      context.throw(500, error)
    }

    context.status = 200
    context.body = result
  })

  return router.middleware()
}
