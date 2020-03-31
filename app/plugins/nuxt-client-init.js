export default async ({ app }, inject) => {
  if (process.static) {
    await app.store.dispatch('nuxtClientInit', app, inject)
  }
}