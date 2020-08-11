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

export async function getLogistics (config = {}) {
  const data = await db.collection('logistic-donation-needs')
    .get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map((doc) => {
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
      return []
    })
  const total = data.length
  return {
    total,
    data
  }
}
