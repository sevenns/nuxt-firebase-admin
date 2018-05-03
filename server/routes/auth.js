'use strict'

import Router from 'koa-router'
import { client, db } from '../firebase.js'

const router = new Router()

export default (app) => {
  router.post('/signin', async (context, next) => {
    const { email, password } = context.request.body
    const collection = db.collection('administration-users')
    const query = collection.where('email', '==', email)
    const isExists = await query.get().then(snap => snap.size)
    let response = {
      status: false,
      uuid: null,
      message: 'There is no administrator with this email'
    }

    if (isExists) {
      await client.auth().signInWithEmailAndPassword(email, password).then(snap => {
        response = {
          status: true,
          uuid: snap.uid,
          message: 'Success'
        }

        context.session.uuid = snap.uid
      }).catch(error => {
        response.message = error.message
      })
    }

    context.type = 'json'
    context.body = response
  })

  router.get('/signout', async (context, next) => {
    if (context.session) {
      context.session = null
    }

    context.status = 200
  })

  return router.middleware()
}
