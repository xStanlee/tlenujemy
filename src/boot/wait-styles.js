import { Loading, QSpinnerPuff } from 'quasar'
import { boot } from 'quasar/wrappers'

async function waitForCss() {
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))

  const linkPromises = links.map(link => new Promise(resolve => {
    // jeśli parser już przypisał sheet – CSS zwykle jest gotowy
    if (link.sheet) return resolve()
    link.addEventListener('load', () => resolve(), { once: true })
    link.addEventListener('error', () => resolve(), { once: true }) // nie blokuj na błędzie
  }))

  const fontsReady =
    'fonts' in document ? document.fonts.ready : Promise.resolve()

  // dodatkowa klatka renderu, by uniknąć FOUC
  const afterPaint = () =>
    new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => r())))
  const oneSecTimeout = new Promise(r => setTimeout(r, 1400))
  return Promise.all([...linkPromises, fontsReady, oneSecTimeout]).then(() => afterPaint())
}

export default boot(async () => {
  // Pokaż krótkie „ładowanie” (opcjonalne)
  Loading.show({
    spinner: QSpinnerPuff,
    message: 'Zapraszamy',
    spinnerSize: 140,
    customClass: 'preloading'
  })
  try {
    await waitForCss()
  } finally {
    Loading.hide()
  }
})
