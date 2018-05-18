'use strict'

import { admin } from '~/server/firebase.js'

export default async (context) => {
  const { password } = context.request.body
  const uuid = context.session.uuid
  let result = {
    status: false,
    message: 'Error'
  }

  result = await admin.auth().updateUser(uuid, { password }).then(() => {
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

  return result
}
