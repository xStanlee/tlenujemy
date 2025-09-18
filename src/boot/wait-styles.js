import { Loading } from 'quasar';
import { boot } from 'quasar/wrappers';
import TlenovoCustomLoader from 'src/components/TlenovoCustomLoader.vue';

// Promise, które rozwiąże się po pełnym załadowaniu strony
function waitForWindowLoad() {
  return new Promise(resolve => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve, { once: true });
    }
  });
}

async function initialTimeout(ms = 2200) {
  return new Promise(r => setTimeout(r, ms))
}

async function waitForCssAndFonts() {
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

  const linkPromises = links.map(link => new Promise(resolve => {
    if (link.sheet) return resolve();
    link.addEventListener('load', resolve, { once: true });
    link.addEventListener('error', resolve, { once: true });
  }));

  // Gotowość wszystkich fontów (w tym webfontów)
  const fontsReady = 'fonts' in document ? document.fonts.ready : Promise.resolve();

  // Po pełnym renderze: dwie klatki
  function afterPaintFrames(frames = 10) {
    return new Promise(resolve => {
      function nextFrame(n) {
        if (n <= 0) return resolve();
        requestAnimationFrame(() => nextFrame(n - 1));
      }
      nextFrame(frames);
    });
  }

  // Czekaj na wszystko naraz
  await Promise.all([...linkPromises, fontsReady, waitForWindowLoad(), initialTimeout()]);
  await afterPaintFrames();
}

export default boot(async () => {
  Loading.show({
    spinner: TlenovoCustomLoader,
    spinnerSize: 140,
    customClass: 'preloading'
  });
  try {
    await waitForCssAndFonts();
  } finally {
    Loading.hide();
  }
});
