import axios from 'axios'

const DashboardPikobarAPI = axios.create({
  baseURL: 'https://dashboard-pikobar-api.digitalservice.id ',
})

const Covid19PublicAPI = axios.create({
  baseURL: 'https://covid19-public.digitalservice.id/api'
})

const CoreDataAPI = axios.create({
  baseURL: 'https://coredata.digitalservice.id'
})

export default function(_, inject) {
  inject('dashboardPikobarApi', DashboardPikobarAPI)
  inject('covid19PublicApi', Covid19PublicAPI)
  inject('coreDataApi', CoreDataAPI)
}

export {
  DashboardPikobarAPI,
  Covid19PublicAPI,
  CoreDataAPI
}
