'use strict'

import Router from 'koa-trie-router'
import appearance from './routes/defaults/appearance'

const router = new Router()

export default () => {
  router.get(appearance())

  return router.middleware()
}
