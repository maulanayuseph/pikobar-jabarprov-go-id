import { db } from '../lib/firebase'
import { slufigyDocumentRoute } from '../lib/slugify'

export const ORDER_INDEX = 'published_at'
export const ORDER_TYPE = 'desc'

export function get (options = { perPage: 3 }) {
  return db.collection('documents')
    .where('published', '==', true)
    .orderBy(ORDER_INDEX, 'desc')
    .limit(options.perPage)
    .get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map((doc) => {
          const data = doc.data()
          const route = slufigyDocumentRoute(doc.id, data.title)
          return {
            ...data,
            id: doc.id,
            published_at: data.published_at.toDate(),
            route,
            shareText: `[Pikobar] Bagikan "${data.title}". Selengkapnya di ${process.env.URL}${route}`
          }
        })
      }
      return []
    })
}

export function getById (id) {
  return db.collection('documents')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        const route = slufigyDocumentRoute(doc.id, data.title)
        return {
          ...data,
          id: doc.id,
          published_at: data.published_at.toDate(),
          route,
          shareText: `[Pikobar] Bagikan "${data.title}". Selengkapnya di ${process.env.URL}${route}`
        }
      }
      return null
    })
}
