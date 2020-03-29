import { db } from '../lib/firebase'

export function get (options = { perPage: 9999 }) {
  return db.collection('emergency_numbers')
    .limit(options.perPage)
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
