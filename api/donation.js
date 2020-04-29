import axios from 'axios'

const WMSApi = axios.create({
  baseURL: process.env.WMS_BASE_URL
})

export function getCollectedDonations () {
  return WMSApi.get('material', {
    headers: {
      'api-key': process.env.WMS_API_KEY
    }
  })
    .then((r) => {
      try {
        return r.data.msg
      } catch (e) {
        return []
      }
    })
}
