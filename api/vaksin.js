import { db } from '../lib/firebase'

export async function get () {
  const list = await db.collection('vaccination_content')
    .orderBy('order', 'ASC')
    .get()
    .then((snapshots) => {
      if (snapshots.empty) {
        return []
      }
      return snapshots
        .docs
        .map((docSnapshot) => {
          const data = docSnapshot.data()
          return {
            ...data,
            published_at: data.published_at.toDate(),
            id: docSnapshot.id
          }
        })
        .filter((doc) => {
          return typeof doc.source === 'string' &&
            doc.source.length
        })
    })
  return list
}
