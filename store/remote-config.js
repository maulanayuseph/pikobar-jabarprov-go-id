export const state = () => ({
  config: null
})

export const mutations = {
  setConfig (state, config) {
    state.config = config
  }
}

export const actions = {
  async getConfig ({ state, commit }) {
    if (process.server) {
      return
    }
    const module = await import('../lib/firebase-client')
      .then((m) => {
        return m ? m.default || m : null
      })
    if (module) {
      const { remoteConfig } = module
      let retry = 0
      const fetch = () => {
        if (retry >= 5) {
          return Promise.resolve()
        }
        return remoteConfig.fetchAndActivate()
          .catch(() => {
            retry += 1
            return fetch()
          })
      }
      await fetch()
        .then(() => {
          const enableDownload = remoteConfig.getValue('download_app_via_web_enabled')._value === 'true'
          const downloadAppURL = remoteConfig.getValue('download_app_url')._value
          const selfDiagnoseURL = remoteConfig.getValue('selfdiagnose_url')._value
          const announcement = remoteConfig.getValue('announcement')._value
          const pikobarWebPopupCampaign = remoteConfig.getValue('pikobar_web_popup_campaign')._value
          commit('setConfig', {
            enableDownload,
            downloadAppURL,
            selfDiagnoseURL,
            announcement: announcement ? JSON.parse(announcement) : null,
            pikobarWebPopupCampaign: pikobarWebPopupCampaign ? JSON.parse(pikobarWebPopupCampaign) : null
          })
        })
    }
  }
}
