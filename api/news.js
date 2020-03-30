import { db } from '../lib/firebase'
import { slugifyArticleRoute } from '../lib/slugify'

export const ORDER_INDEX = 'published_at'
export const ORDER_TYPE = 'desc'

export function get (options = { perPage: 3 }) {
  return db.collection('articles')
    .orderBy(ORDER_INDEX, 'desc')
    .limit(options.perPage)
    .get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map((doc) => {
          const data = doc.data()
          return {
            ...data,
            id: doc.id,
            published_at: data.published_at.toDate(),
            route: slugifyArticleRoute(doc.id, data.title)
          }
        })
      }
      return []
    })
}

export function getById (id) {
  return db.collection('articles')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        return {
          ...data,
          id: doc.id,
          published_at: data.published_at.toDate(),
          route: slugifyArticleRoute(doc.id, data.title)
        }
      }
      return null
    })
}
