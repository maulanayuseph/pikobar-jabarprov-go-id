import axios from 'axios'
import { db } from '../lib/firebase'

const WMSApi = axios.create({
  baseURL: process.env.WMS_BASE_URL,
  headers: {
    'api-key': process.env.WMS_API_KEY
  }
})

export {
  WMSApi
}

export async function getCollectedDonations (config = {}) {
  const data = await WMSApi.get('master/material', config)
    .then((r) => {
      return r.data.data
    }).catch((e) => {
      return []
    })
  const total = await WMSApi.get('master/material', {
    params: {
      search: config.params.search,
      where: config.params.where,
      count: true
    }
  }).then((r) => {
    return r.data.data.count
  })
  return {
    total,
    data
  }
}

export async function getLogistics ({ perPage = 10, currentPage, newPage, firstSnapshot, lastSnapshot } = {}) {
  const count = await db.doc('counters/logistic-donation-needs').get().then(doc => doc.get('count'))
  let query = db.collection('logistic-donation-needs').orderBy('name', 'asc')
  if (!firstSnapshot && !lastSnapshot) {
    query = query.limit(perPage)
  } else if (newPage < currentPage && firstSnapshot) {
    query = query.endBefore(firstSnapshot).limitToLast(perPage)
  } else if (newPage > currentPage && lastSnapshot) {
    query = query.startAfter(lastSnapshot).limit(perPage)
  }
  const [first, last, data] = await query
    .get()
    .then((snapshots) => {
      let first = null
      let last = null
      let data = []
      if (!snapshots.empty) {
        [first, last] = [snapshots.docs[0], snapshots.docs[snapshots.docs.length - 1]]
        data = snapshots.docs.map((doc) => {
          const data = doc.data()
          return {
            ...data,
            id: doc.id,
            matg_id: data.name,
            label: data.name,
            sisa: data.amount
          }
        })
      }
      return [first, last, data]
    })
  return {
    total: count,
    data,
    first,
    last
  }
}

export function getAllLogisticsNeeds () {
  return db.collection('logistic-donation-needs')
    .get()
    .then((snapshots) => {
      return snapshots.docs.map((doc) => {
        const data = doc.data()
        return {
          ...data,
          id: doc.id,
          matg_id: data.name,
          label: data.name,
          sisa: data.amount
        }
      })
    })
}
