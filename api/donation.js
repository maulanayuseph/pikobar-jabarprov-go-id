import axios from 'axios'

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
      where: {
        matg_id: `${config.params.search}`.toUpperCase()
      }
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
  const data = await WMSApi.get('api/logistik', config)
    .then((r) => {
      return r.data.data
    }).catch((e) => {
      return []
    })

  const total = await WMSApi.get('api/logistik', {
    params: {
      where: {
        matg_id: `${config.params.search}`.toUpperCase()
      },
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
