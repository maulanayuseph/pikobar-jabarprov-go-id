require('dotenv').config()
const firestoreExport = require('node-firestore-import-export').firestoreExport
const firebaseAdmin = require('firebase-admin')
const SECRET = require('../firebase-admin.config')
const firebaseConfig = require('../firebase.config')
const firestoreData = require('../migration/firestore.json')
const firestoreImportConfig = require('../config.firestore-import')

const fs = require('fs');


const appConfig = {
  credential: firebaseAdmin.credential.cert(SECRET),
  databaseURL: firebaseConfig.databaseURL
}

const app = firebaseAdmin.initializeApp(appConfig)

const run = async () => {
  const terminalFgBlack = '\x1b[30m'
  const terminalBgCyan = "\x1b[46m"
  const terminalBgGreen = "\x1b[42m"
  const terminalReset = '\x1b[0m'
  const exportPath = 'migration/export.json'

  if(!process.argv[2]) {
    console.log(`${terminalBgCyan}${terminalFgBlack}%s${terminalReset}}`, 'Usage: npm run export [collection-name]')
    return 0
  }

  const collectionRef = firebaseAdmin.firestore().collection(process.argv[2])
  firestoreExport(collectionRef)
    .then(data => {
      console.log(`Writing exported data to ${exportPath}`)
      fs.writeFile(exportPath, JSON.stringify(data, null, 2), 'utf8', (error) => {
        if(error) {
          console.log(error);
        } else {
          console.log(`${terminalBgGreen}${terminalFgBlack}%s${terminalReset}}`, `Collection '${process.argv[2]}' has been exported to ${exportPath}`)
        }
      })
    }).catch((e) => {
      console.log(e ? e.message : e)
    });
}

run()
