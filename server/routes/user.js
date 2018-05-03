'use strict'

import Router from 'koa-router'
import { admin, db } from '../firebase.js'

const router = new Router()

export default (app) => {
  router.post('/get', async (context, next) => {
    const { uuid } = context.request.body
    const doc = db.collection('administration-users').doc(uuid)
    const user = await doc.get().then(snap => snap.data())

    context.type = 'json'
    context.body = user
  })

  router.post('/change_navigation_state', async (context, next) => {
    if (!context.session.uuid) {
      context.status = 403
      context.body = { message: 'Access denied!' }
      return
    }

    const { state } = context.request.body
    const uuid = context.session.uuid
    const doc = db.collection('administration-users').doc(uuid)

    await doc.update({ 'appearance.navigation': state })

    context.status = 200
  })

  router.post('/change_password', async (context, next) => {
    if (!context.session.uuid) {
      context.status = 403
      context.body = { message: 'Access denied!' }
      return
    }

    const { password } = context.request.body
    const uuid = context.session.uuid
    let response = {
      status: false,
      message: 'Error'
    }

    response = await admin.auth().updateUser(uuid, { password }).then(() => {
      return {
        status: true,
        message: 'Password successfully saved'
      }
    }).catch(error => {
      return {
        status: false,
        message: error.message
      }
    })

    context.type = 'json'
    context.body = response
  })

  router.post('/change_theme', async (context, next) => {
    if (!context.session.uuid) {
      context.status = 403
      context.body = { message: 'Access denied!' }
      return
    }

    const { theme, color } = context.request.body
    const uuid = context.session.uuid
    const doc = db.collection('administration-users').doc(uuid)
    let response = {
      status: false,
      message: 'Error'
    }

    response = await doc.update({ 'appearance.theme': theme }).catch(error => {
      return {
        status: false,
        message: error.message
      }
    })

    response = await doc.update({ 'appearance.color': color }).then(() => {
      return {
        status: true,
        message: 'Theme successfully saved'
      }
    }).catch(error => {
      return {
        status: false,
        message: error.message
      }
    })

    context.type = 'json'
    context.body = response
  })

  return router.middleware()
}
