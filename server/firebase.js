'use strict'

import Firebase from 'firebase'
import * as Admin from 'firebase-admin'
import config from '~/server/config'
import * as key from '~/secret.json'
import 'firebase/firestore'

Admin.initializeApp({
  credential: Admin.credential.cert(key),
  databaseURL: `https://${config.firebase.projectId}.firebaseio.com`
})

Firebase.initializeApp({
  apiKey: config.firebase.apiKey,
  authDomain: `${config.firebase.projectId}.firebaseapp.com`,
  projectId: config.firebase.projectId
})

export const client = Firebase
export const admin = Admin
export const db = Admin.firestore()
