import { db } from '../lib/firebase'

export function get (options) {
  return db.collection('task_forces')
    .orderBy('code', 'asc')
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
