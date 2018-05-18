'use strict'

import { client, db } from '~/server/firebase.js'

export default async (context) => {
  const { email, password } = context.request.body
  const collection = db.collection('administration-users')
  const query = collection.where('email', '==', email)
  const isExists = await query.get().then(snap => snap.size)
  let result = {
    status: false,
    uuid: null,
    message: 'There is no administrator with this email'
  }

  if (isExists) {
    await client.auth().signInWithEmailAndPassword(email, password).then(snap => {
      result = {
        status: true,
        uuid: snap.uid,
        message: 'Success'
      }

      context.session.uuid = snap.uid
    }).catch(error => {
      result.message = error.message
    })
  }

  return result
}
