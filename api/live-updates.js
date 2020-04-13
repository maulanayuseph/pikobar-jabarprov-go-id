import { db } from '../lib/firebase'

export function get (options) {
  return db.collection('live-updates')
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
    })
}
