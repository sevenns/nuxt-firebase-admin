'use strict'

import { db } from '~/server/firebase.js'

export default async (context) => {
  const { state } = context.request.body
  const uuid = context.session.uuid
  const doc = db.collection('administration-users').doc(uuid)

  await doc.update({ 'appearance.navigation': state })

  return 'OK'
}
