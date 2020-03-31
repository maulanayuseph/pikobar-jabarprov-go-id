import { db } from '../lib/firebase'

export function get (options) {
  return db.collection('banners')
    .get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map((doc) => {
          const data = doc.data()
          return {
            ...data,
            id: doc.id
          }
        })
      }
      return []
    })
}

export function getById (id) {
  return db.collection('banners')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        return {
          ...data,
          id: doc.id
        }
      }
      return null
    })
}
