import { db } from '../lib/firebase'

export function getCases (options) {
  return db.collection('statistics')
    .doc('jabar-dan-nasional')
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        data.updated_at = data.updated_at.toDate()
        Object.assign(data.odp, {
          proses: {
            jabar: (data.odp.total.jabar || 0) - (data.odp.selesai.jabar || 0),
            nasional: (data.odp.total.nasional || 0) - (data.odp.selesai.nasional || 0)
          }
        })
        Object.assign(data.pdp, {
          proses: {
            jabar: (data.pdp.total.jabar || 0) - (data.pdp.selesai.jabar || 0),
            nasional: (data.pdp.total.nasional || 0) - (data.pdp.selesai.nasional || 0)
          }
        })
        return {
          ...data
        }
      }
      return null
    })
}
