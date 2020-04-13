require('dotenv').config()
const firestoreImport = require('node-firestore-import-export').firestoreImport
const firebaseAdmin = require('firebase-admin')
const SECRET = require('../firebase-admin.config')
const firebaseConfig = require('../firebase.config')
const firestoreData = require('../migration/firestore.json')
const firestoreImportConfig = require('../config.firestore-import')

const appConfig = {
  credential: firebaseAdmin.credential.cert(SECRET),
  databaseURL: firebaseConfig.databaseURL
}

const app = firebaseAdmin.initializeApp(appConfig)

const run = async () => {
  for (const collectionName in firestoreData.__collections__) {
    const coll = firestoreData.__collections__[collectionName]
    for (const id in coll) {
      const data = {
        [id]: coll[id]
      }
      const ref = app.firestore().collection(`${collectionName}`)
      await firestoreImport(data, ref)
        .then(() => {
          console.log('Firestore data successfully imported')
        }).catch((e) => {
          console.log(e ? e.message : e)
        })
      await new Promise((resolve) => {
        setTimeout(() => resolve(), firestoreImportConfig.INTERVAL)
      })
    }
  }
}

run()
