'use strict'

import Router from 'koa-trie-router'
import { db } from '~/server/firebase'

import theme from './routes/appearance/theme'
import navigation from './routes/appearance/navigation'
import changePassword from './routes/change-password'

const router = new Router()

export default () => {
  router.post('/get', async (context, next) => {
    const { uuid } = context.request.body
    const doc = db.collection('administration-users').doc(uuid)
    const user = await doc.get().then(snap => snap.data())

    context.type = 'json'
    context.body = user
  })

  router.post(theme())
  router.post(navigation())
  router.post(changePassword())

  return router.middleware()
}
