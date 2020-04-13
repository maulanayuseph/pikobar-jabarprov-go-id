import * as firebaseAdmin from 'firebase-admin'

import SECRET from '../firebase-admin.config'
import firebaseConfig from '../firebase.config'

const admin = firebaseAdmin.default || firebaseAdmin
const appConfig = {
  credential: admin.credential.cert(SECRET),
  databaseURL: firebaseConfig.databaseURL
}
let _app
if (!admin.apps.length) {
  _app = admin.initializeApp(appConfig)
}
const app = _app
const db = admin.firestore()
const storage = admin.storage()
const { Timestamp, GeoPoint, FieldValue } = admin.firestore
const messaging = null
export {
  app,
  db,
  storage,
  messaging,
  Timestamp,
  GeoPoint,
  FieldValue
}
