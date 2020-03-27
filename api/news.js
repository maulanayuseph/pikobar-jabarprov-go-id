import _kebabCase from 'lodash/kebabCase'
import { db } from '~/lib/firebase'

export function slugify (id, title) {
  if (!id || !title) {
    console.error('slugify: id and title must be supplied')
    return '#'
  }
  return `/articles/${_kebabCase(title)}-artcl.${id}`
}

export function get (options = { perPage: 3 }) {
  return db.collection('articles')
    .orderBy('published_at', 'desc')
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
            route: slugify(doc.id, data.title)
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
          route: slugify(doc.id, data.title)
        }
      }
      return null
    })
}
