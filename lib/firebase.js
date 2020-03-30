let firebase
if (process.server) {
  firebase = require('./firebase-server')
} else if (process.client || process.browser) {
  firebase = require('./firebase-client')
}

const {
  db,
  storage,
  analytics,
  messaging,
  Timestamp,
  GeoPoint,
  FieldValue
} = firebase

export {
  db,
  storage,
  analytics,
  messaging,
  Timestamp,
  GeoPoint,
  FieldValue
}
