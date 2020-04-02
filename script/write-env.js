const fs = require('fs')
const _snakeCase = require('lodash/snakeCase')

let string = ''
  .concat('HOST=localhost\n')
  .concat('PORT=8083\n')
  .concat('URL="http://localhost:8083"\n')
  .concat('NUXT_ENV_VERSION="1.2.0"\n')
  .concat('\n')
/**
 * FOR FIREBASE ADMIN
 */
;(function () {
  const JSON = require('../config.firebase.service-account')
  Object.keys(JSON).forEach((key, index, coll) => {
    let ucase = key.toUpperCase()
    if ([
      'auth_provider_x509_cert_url',
      'client_x509_cert_url'
    ].includes(key)) {
      ucase = ucase.slice(0, ucase.indexOf('_CERT_URL'))
    }

    let value = JSON[key]
    if (key === 'private_key') {
      value = value.replace(/\n/g, '\\n')
    }
    string += `FIREBASE_ADMIN_${ucase}="${value}"\n`
    if (index === coll.length - 1) {
      string += '\n'
    }
  })
}())

/**
 * FOR FIREBASE CLIENT
*/
;(function () {
  const JSON = require('../config.firebase.sdk')
  Object.keys(JSON).forEach((key, index, coll) => {
    const ucase = _snakeCase(key).toUpperCase()
    const value = JSON[key]
    string += `FIREBASE_${ucase}="${value}"\n`
    if (index === coll.length - 1) {
      string += '\n'
    }
  })
}())

fs.writeFile('./.env', string, (err) => {
  if (err) {
    console.error(err)
  }
})
