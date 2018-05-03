'use strict'

import Router from 'koa-router'
import { client, db } from '../firebase.js'

const router = new Router()

export default (app) => {
  router.post('/signin', async (context, next) => {
    const { email, password } = context.request.body
    const collection = db.collection('administration-users')
    const query = collection.where('email', '==', email)
    const isExists = await query.get().then(response => {
      return response.size
    })
    let authStatus = {
      status: false,
      uuid: null,
      message: 'There is no administrator with this email'
    }

    if (isExists) {
      await client.auth().signInWithEmailAndPassword(email, password).then(response => {
        authStatus.status = true
        authStatus.uuid = response.uid
        authStatus.message = 'Success'
        context.session.uuid = response.uid
      }).catch(error => {
        authStatus.message = error.message
      })
    }

    context.type = 'json'
    context.body = { authStatus }
  })

  router.get('/signout', async (context, next) => {
    if (context.session) {
      context.session = null
    }

    context.type = 'json'
    context.body = {}
  })

  router.get('/check', async (context, next) => {
    context.type = 'json'
    context.body = { uuid: context.session.uuid }
  })

  return router.middleware()
}
