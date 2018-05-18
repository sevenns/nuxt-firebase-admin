'use strict'

import Router from 'koa-trie-router'
import controller from '../../controllers/appearance/navigation'

const router = new Router()

export default () => {
  router.post('/change_navigation_state', async (context, next) => {
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
