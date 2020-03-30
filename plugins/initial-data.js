export default async function ({ app }) {
  await Promise.all([
    app.store.dispatch('remote-config/getConfig')
  ])
}
