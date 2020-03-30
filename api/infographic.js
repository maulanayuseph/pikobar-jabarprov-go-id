import { db } from '../lib/firebase'
import { slugifyInfographicRoute } from '../lib/slugify'

export const ORDER_INDEX = 'published_date'
export const ORDER_TYPE = 'desc'

export function get (options = { perPage: 3 }) {
  return db.collection('infographics')
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
            published_date: data.published_date.toDate(),
            route: slugifyInfographicRoute(doc.id, data.title)
          }
        })
      }
      return []
    })
}

export function getById (id) {
  return db.collection('infographics')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        return {
          ...data,
          id: doc.id,
          published_date: data.published_date.toDate(),
          route: slugifyInfographicRoute(doc.id, data.title)
        }
      }
      return null
    })
}
