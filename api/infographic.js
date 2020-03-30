import _kebabCase from 'lodash/kebabCase'
import { db } from '~/lib/firebase'

function slugify (id, title) {
  if (!id || !title) {
    console.error('slugify: id and title must be supplied')
    return '#'
  }
  return `/infographics/${_kebabCase(title)}-inf.${id}`
}

export function get (options = { perPage: 3 }) {
  return db.collection('infographics')
    .orderBy('published_date', 'desc')
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
            route: slugify(doc.id, data.title)
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
          route: slugify(doc.id, data.title)
        }
      }
      return null
    })
}
