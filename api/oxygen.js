import { db } from '../lib/firebase'

export function get (options = { perPage: 9999 }) {
  return db.collection('oxygen_center')
    .limit(options.perPage)
    .get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map((doc) => {
          const data = doc.data()
          let { phones } = data
          if (!Array.isArray(phones)) {
            phones = Array.from(Object.values(phones || {}))
          }
          return {
            address: data.address || '',
            name: data.name || '',
            itemType: data.item_type || '',
            ...data,
            id: doc.id,
            phones
          }
        })
      }
      return []
    })
}

export function getInfo () {
  return db.collection('oxygen_info')
    .orderBy('sequence_number', 'asc')
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
