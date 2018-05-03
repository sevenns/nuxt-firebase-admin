'use strict'

import Router from 'koa-router'
import { admin, db } from '../firebase.js'

const router = new Router()

export default (app) => {
  router.post('/get', async (context, next) => {
    const { uuid } = context.request.body
    const doc = db.collection('administration-users').doc(uuid)
    const user = await doc.get().then(response => {
      return response.data()
    })

    context.type = 'json'
    context.body = { user }
  })

  router.post('/change_navigation_state', async (context, next) => {
    const { state } = context.request.body
    const uuid = context.session.uuid

    await db.collection('administration-users').doc(uuid).update({
      'appearance.navigation': state
    })

    context.type = 'json'
    context.body = { messsage: true }
  })

  router.post('/change_password', async (context, next) => {
    const { password } = context.request.body
    const uuid = context.session.uuid
    let response = {
      status: false,
      message: 'Error'
    }

    response = await admin.auth().updateUser(uuid, { password }).then(response => {
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
    context.body = { response }
  })

  router.post('/change_theme', async (context, next) => {
    const { theme, color } = context.request.body
    const uuid = context.session.uuid
    const user = db.collection('administration-users').doc(uuid)
    let response = {
      status: false,
      message: 'Error'
    }

    response = await user.update({ 'appearance.theme': theme }).catch(error => {
      return {
        status: false,
        message: error.message
      }
    })

    response = await user.update({ 'appearance.color': color }).then(response => {
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
    context.body = { response }
  })

  return router.middleware()
}
