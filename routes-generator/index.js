import {
  slufigyDocumentRoute,
  slugifyArticleRoute,
  slugifyInfographicRoute
} from '../lib/slugify'

export default async function () {
  const firebase = await import('../lib/firebase-server').then(m => m ? m.default || m : null)
  if (!firebase) {
    console.error('[firebase-server]: module not found')
    return []
  }
  const infographics = await firebase.db.collection('infographics')
    .get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map((doc) => {
          const data = doc.data()
          return slugifyInfographicRoute(doc.id, data.title)
        })
      }
      return []
    })
  const articles = await firebase.db.collection('articles')
    .get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map((doc) => {
          const data = doc.data()
          return slugifyArticleRoute(doc.id, data.title)
        })
      }
      return []
    })
  const documents = await firebase.db.collection('documents')
    .get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map((doc) => {
          const data = doc.data()
          return slufigyDocumentRoute(doc.id, data.title)
        })
      }
      return []
    })
  return [
    ...infographics,
    ...articles,
    ...documents
  ]
}
