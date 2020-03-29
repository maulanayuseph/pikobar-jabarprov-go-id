import { db } from '../lib/firebase'

export function get (options = { perPage: 3 }) {
  return db.collection('broadcasts')
    .orderBy('published_at', 'desc')
    .limit(20)
    .get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map((doc) => {
          const data = doc.data()
          return {
            ...data,
            id: doc.id,
            published_at: data.published_at.toDate()
          }
        })
      }
      return []
    })
}

export function getById (id) {
  return db.collection('broadcasts')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        return {
          ...data,
          id: doc.id,
          published_at: data.published_at.toDate()
        }
      }
      return null
    })
}
