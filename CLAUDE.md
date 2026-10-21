# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Tlenovo is a single-page marketing and booking site for a hyperbaric oxygen therapy business, built with Quasar 2 + Vue 3 (`<script setup>`) + Pinia + Vite. The UI copy is in Polish, and code comments mix Polish and English. It deploys to GitHub Pages under `/tlenujemy/`. `Hyperbaric_Status.md` is a longer project context doc (in Polish) covering conventions and Quasar components in use. Read it when adding components.

## Commands

```bash
npm install          # also runs `quasar prepare` (postinstall)
npm run dev          # quasar dev, opens browser
npm run build        # quasar build -m spa → dist/spa
npm run lint         # eslint over src
npm run format       # prettier write
npm run deploy       # build + publish dist/spa to gh-pages
```

There are no tests (`npm test` is a no-op). ESLint also runs during `quasar build` via `vite-plugin-checker`, but not in dev. The production build strips `console`/`debugger` (Oxc minifier `dropConsole`/`dropDebugger` in `quasar.config.js` — Vite 8 no longer bundles esbuild, so don't use `minify: 'esbuild'`).

## Architecture

**There is effectively only one page.** `router/routes.js` mounts `layouts/MainLayout.vue`, but `pages/IndexPage.vue` is the unused Quasar placeholder. The whole app lives in `MainLayout.vue`:

- **Tabs instead of routes.** A reactive `tabConfigs` array maps `tab1..tab4` to views in `src/views/` (Main, Info/"Zastosowania", Contra/"Przeciwwskazania", Offer/"Kontakt"). Each entry declares `props` (using getters, so they stay reactive) and `events`. Views move between tabs by emitting events that MainLayout handles, e.g. `redirect`, `benefitClick` (which sets `targetBenefit` so InfoView scrolls to that section), and `locationClick`. When you add a cross-view interaction, wire it through `tabConfigs`.
- **Desktop = phone emulator showing an iframe.** `isMobile = $q.screen.lt.md`. On desktop (`isDesktopShell`), MainLayout renders only `components/PhoneEmulator` and the chatbot, which sits outside the phone and is fixed to the real viewport. The emulator loads the same app in an iframe (`?embedded=1`, 381×690). Inside the iframe the normal mobile `q-layout` runs, so media queries, `vw`/`vh` and `$q.screen` behave exactly as on a phone. Write responsive styles for the mobile layout only, with no emulator-specific CSS. `composables/useEmbeddedMode.js` handles detection (`isEmbedded`) and `postMessage` between the two windows. For example, a chatbot booking request on desktop is forwarded to the iframe as `tlenovo:book-request`. In embedded mode the inner app hides its own chatbot, enables mouse drag-to-scroll (`useDragScroll`), hides scrollbars, including the document one (`html.TlenovoEmbedded` in `app.scss`, set in the `wait-styles` boot) and skips the loader's minimum delay.
- **Floating buttons depend on scroll position.** The book, phone and AI-chat buttons appear and hide based on `offsetTop` (from `q-scroll-observer`) compared against hardcoded pixel thresholds (`ACTION_BTN_ACTIVATION_OFFSET`, `FOOTER_ACTIVATION_OFFSET` per tab). If content length changes, these thresholds may need adjusting.
- **Swipe gestures** on the tab panels switch tabs. The listeners are attached manually in `onMounted`.

**Booking flow:** `TlenovoForm` (inside `TlenovoMainView`) emits `submit`. The view then calls `appointmentService.addAppointment()`, which writes to the Firestore `appointments` collection (Firebase config is hardcoded in the service), and `notificationService.sendReservationNotification()`, which POSTs `{name, phone, date, time}` to the `tlenovo-notify` Cloudflare Worker (source in `cloudflare/notify-worker/`, deployed separately with wrangler). The worker sends it as a Telegram bot message to the chat IDs stored in its secrets. A notification failure is logged and does not block the booking.

**AI chatbot:** `chatbotService` POSTs `{message, history}` to a Cloudflare Worker proxy for Gemini (`tlenovo-ai-api...workers.dev`). History uses the Gemini format `{role: 'user'|'model', parts:[{text}]}`. The worker's reply can contain the markers `###ACTION_CALL###` or `###ACTION_BOOK###`. `TlenovoChatbot.vue` strips them from the text and then either starts a phone call or emits `bookRequest`. MainLayout handles `bookRequest` by closing the chat, switching to tab1 and opening the form, with timed delays so the animations can finish. The system prompt lives in the worker, not in this repo.

**Other pieces:**
- `services/pdf-generator.service.js` builds the "regulamin" (terms of service) PDF with jsPDF. The terms text is embedded in the file, and it uses the Lato font from `assets/Lato-Regular-normal.js` so Polish characters render.
- Boot order is `wait-styles` → `axios` → `pinia`. `wait-styles` shows a custom `Loading` spinner until CSS, fonts and window load are done, with a minimum of about 2.2s.
- `services/log.serivce.js` (filename typo is intentional, so keep the import path) reads its colors from CSS vars such as `--q-attention`, defined in `quasar.variables.scss`.
- `stores/snackbar-store.js` is the only Pinia store. `TlenovoSnackbar` displays it.

## Conventions

- Every component lives in `src/components/TlenovoName/TlenovoName.vue` with the `Tlenovo` prefix. Helper modules go next to it (e.g. `TlenovoForm.date.js`).
- Styles are scoped SCSS with BEM names that use the component name as the block (`.TlenovoForm__header`, `--modifier`). Import `src/css/quasar.variables.scss` for brand colors (`$primary #003e5a`, `$secondary #A1C6EA`, etc.).
- Services are classes with `#private` fields, exported as singletons (`export const xService = new XService()`). Composables are `use*` functions that return refs and methods. Stores use the Pinia options API plus `acceptHMRUpdate`.
- Prettier settings: no semicolons, single quotes, width 100. Existing files are inconsistent about semicolons, so match the file you're editing.
- Router is in hash mode, and `publicPath`/`base` is `/tlenujemy/`, which GitHub Pages requires.
- Commit messages follow `Tlenujemy--<N> - <description>`.
