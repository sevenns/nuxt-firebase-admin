'use strict'

import { db } from '~/server/firebase.js'

export default async (context) => {
  const doc = db.collection('administration-settings').doc('defaults')
  const appearance = await doc.get().then(snap => snap.data().appearance)

  return appearance
}
