'use strict'

import Router from 'koa-router'
import { db } from '../firebase.js'

const router = new Router()

export default (app) => {
  router.get('/get/defaults/appearance', async (context, next) => {
    const doc = db.collection('administration-settings').doc('defaults')
    const appearance = await doc.get().then(snap => snap.data().appearance)

    context.type = 'json'
    context.body = appearance
  })

  return router.middleware()
}
