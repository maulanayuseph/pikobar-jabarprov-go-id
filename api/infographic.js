import { db } from '../lib/firebase'
import { slugifyInfographicRoute } from '../lib/slugify'

export const ORDER_INDEX = 'published_date'
export const ORDER_TYPE = 'desc'

export async function get (options = { lastSnapshot: null, perPage: 3 }) {
  let query = db.collection('infographics')
    .orderBy(ORDER_INDEX, 'desc')
  if (options.lastSnapshot) {
    query = query.startAfter(options.lastSnapshot)
  }
  const [data, lastSnapshot] = await query
    .limit(options.perPage)
    .get()
    .then((snapshots) => {
      let data = []
      let lastSnapshot = null
      if (!snapshots.empty) {
        lastSnapshot = snapshots.docs[snapshots.docs.length - 1].data().published_date
        data = snapshots.docs.map((doc) => {
          const data = doc.data()
          const route = slugifyInfographicRoute(doc.id, data.title)
          return {
            ...data,
            id: doc.id,
            published_date: data.published_date.toDate(),
            route,
            downloadURL: data.images[0],
            shareText: `[Pikobar] Bagikan "${data.title}". Selengkapnya di ${process.env.URL}${route}`
          }
        })
      }
      return [data, lastSnapshot]
    })
  return {
    data,
    lastSnapshot
  }
}

export function getById (id) {
  return db.collection('infographics')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        const route = slugifyInfographicRoute(doc.id, data.title)
        return {
          ...data,
          id: doc.id,
          published_date: data.published_date.toDate(),
          route,
          downloadURL: data.images[0],
          shareText: `[Pikobar] Bagikan "${data.title}". Selengkapnya di ${process.env.URL}${route}`
        }
      }
      return null
    })
}
