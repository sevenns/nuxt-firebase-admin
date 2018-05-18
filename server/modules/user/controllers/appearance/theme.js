'use strict'

import { db } from '~/server/firebase.js'

export default async (context) => {
  const { theme, color } = context.request.body
  const uuid = context.session.uuid
  const doc = db.collection('administration-users').doc(uuid)
  let result = {
    status: false,
    message: 'Error'
  }

  result = await doc.update({ 'appearance.theme': theme }).catch(error => {
    return {
      status: false,
      message: error.message
    }
  })

  result = await doc.update({ 'appearance.color': color }).then(() => {
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

  return result
}
