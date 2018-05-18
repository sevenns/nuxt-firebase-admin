'use strict'

import Router from 'koa-trie-router'
import mount from 'koa-mount'

import auth from '~/server/modules/auth'
import settings from '~/server/modules/settings'
import user from '~/server/modules/user'

const router = new Router()

export default () => {
  router.use(mount('/auth', auth()))
  router.use(mount('/settings', settings()))
  router.use(mount('/user', user()))

  return router.middleware()
}
