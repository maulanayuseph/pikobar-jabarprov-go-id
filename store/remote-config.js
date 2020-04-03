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
      await remoteConfig.activate()
        .then(() => {
          return fetch()
        }).then(() => {
          const enableDownload = remoteConfig.getValue('download_app_via_web_enabled')._value === 'true'
          const downloadAppURL = remoteConfig.getValue('download_app_url')._value
          const selfDiagnoseURL = remoteConfig.getValue('selfdiagnose_url')._value
          const announcement = remoteConfig.getValue('announcement')._value
          commit('setConfig', {
            enableDownload,
            downloadAppURL,
            selfDiagnoseURL,
            announcement: JSON.parse(announcement)
          })
        })
    }
  }
}
