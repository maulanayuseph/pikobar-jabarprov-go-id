import axios from 'axios'

const trackingAPI = axios.create({
  baseURL: process.env.ISOMAN_API_BASEURL
})

export {
  trackingAPI
}

export async function getTrackingResult () {
  try {
    const response = await trackingAPI.get('/api/v1/landing-page-registration/tracking', { search: 2232 })
    return response
  } catch (error) {
    return error
  }
}
