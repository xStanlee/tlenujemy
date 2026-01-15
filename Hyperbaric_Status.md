# 📘 Tlenovo - Dokument Kontekstowy Projektu

> **Cel dokumentu:** Referencja dla AI/developera z kluczowymi informacjami o projekcie, konwencjach kodu i praktykach stosowanych w tym repozytorium.

---

## 🏗️ Stack Technologiczny

| Technologia | Wersja | Opis |
|-------------|--------|------|
| **Vue** | 3.4+ | Framework frontendowy (Composition API) |
| **Quasar** | 2.16+ | UI Framework na bazie Vue |
| **Pinia** | 3.0+ | State management |
| **Firebase/Firestore** | 11.10+ | Backend - baza danych + auth |
| **Vue Router** | 4.0+ | Routing (hash mode) |
| **SCSS/Sass** | 1.86+ | Styling |
| **Vite** | - | Build tool (via @quasar/app-vite) |
| **jsPDF** | 3.0+ | Generowanie dokumentów PDF |
| **Axios** | 1.2+ | HTTP client |

---

## 📂 Struktura Projektu

```
hyperbarics/
├── src/
│   ├── assets/           # Obrazy, ikony, pliki statyczne
│   ├── boot/             # Inicjalizacja bibliotek (axios, pinia)
│   ├── components/       # Komponenty wielokrotnego użytku
│   │   └── Tlenovo*/     # Każdy komponent w osobnym folderze
│   ├── composables/      # Vue 3 Composition API funkcje
│   ├── css/              # Style globalne + zmienne Quasar
│   ├── layouts/          # Layouty aplikacji (MainLayout.vue)
│   ├── pages/            # Strony routingu (IndexPage, ErrorNotFound)
│   ├── router/           # Konfiguracja routingu
│   ├── services/         # Serwisy biznesowe (Firebase, PDF, etc.)
│   ├── stores/           # Pinia stores
│   └── views/            # Główne widoki aplikacji
├── public/               # Pliki publiczne
├── quasar.config.js      # Konfiguracja Quasar
└── package.json          # Zależności
```

---

## 🎨 System Kolorów (SCSS Variables)

```scss
// Plik: src/css/quasar.variables.scss
$primary   : #003e5a;     // Główny ciemny niebieski
$secondary : #A1C6EA;     // Jasny niebieski accent
$accent    : #F2F4F6;     // Jasny szary
$white     : #FFFFFF;

$dark      : #1D1D1D;
$dark-page : #121212;

$positive  : #21BA45;     // Zielony (sukces)
$negative  : #FF6B6B;     // Czerwony (błąd)
$info      : #31CCEC;
$warning   : #F2C037;
$attention : #00FF00;
```

---

## 📝 Konwencje Kodu

### Komponenty Vue

1. **Naming convention:** `Tlenovo` prefix dla wszystkich komponentów
   - ✅ `TlenovoForm.vue`, `TlenovoFooter.vue`, `TlenovoLogo.vue`
   
2. **Struktura folderów:** Każdy komponent w osobnym folderze
   ```
   components/
   └── TlenovoForm/
       ├── TlenovoForm.vue
       └── TlenovoForm.date.js  # Pomocnicze moduły
   ```

3. **Composition API (`<script setup>`):**
   ```vue
   <script setup>
   import { computed, onMounted, ref } from 'vue';
   
   // Props
   defineProps({ /* ... */ });
   
   // Emits
   const emit = defineEmits(['submit', 'cancel', 'redirect']);
   
   // Refs (reaktywne dane)
   const step = ref(1);
   const date = ref();
   
   // Computed
   const isNextDisabled = computed(() => !date.value);
   
   // Methods
   function onClickHandler() {
       emit('submit', { date: date.value });
   }
   </script>
   ```

4. **Style (scoped SCSS z BEM):**
   ```vue
   <style lang="scss" scoped>
   .TlenovoForm {
       &__header { /* ... */ }
       &__body { /* ... */ }
       &--active { /* modifier */ }
   }
   </style>
   ```

### Serwisy (Services)

1. **Pattern:** Klasy z singleton export
   ```javascript
   // src/services/appointment.service.js
   class AppointmentService {
       #privateField;  // Prywatne pola z #
       isProcessing = false;
       
       constructor() {
           // Inicjalizacja Firebase
       }
       
       async addAppointment(data) {
           this.isProcessing = true;
           try {
               // Logika
           } catch (err) {
               console.error("Błąd:", err);
           } finally {
               this.isProcessing = false;
           }
       }
   }
   
   export const appointmentService = new AppointmentService();
   ```

### Composables

1. **Pattern:** Funkcje `use*` zwracające obiekt z reaktywnymi danymi i metodami
   ```javascript
   // src/composables/usePdfGenerator.js
   import { ref } from "vue";
   
   export function usePdfGenerator() {
       const isGenerating = ref(false);
       const error = ref(null);
       
       async function downloadRegulamin(filename = "regulamin.pdf") {
           isGenerating.value = true;
           error.value = null;
           try {
               // Logika
           } catch (err) {
               error.value = err.message;
           } finally {
               isGenerating.value = false;
           }
       }
       
       return { isGenerating, error, downloadRegulamin };
   }
   ```

### Pinia Stores

1. **Pattern:** Options API z `acceptHMRUpdate`
   ```javascript
   // src/stores/snackbar-store.js
   import { acceptHMRUpdate, defineStore } from 'pinia';
   
   export const useSnackbarStore = defineStore('snackbarStore', {
       state: () => ({
           message: '',
           visible: false,
       }),
       getters: {
           simpleGet: (state) => state.message,
       },
       actions: {
           showSnackbar(message, options = {}) {
               this.message = message;
               this.visible = true;
           },
           hideSnackbar() {
               this.visible = false;
           }
       },
   });
   
   // Hot Module Replacement
   if (import.meta.hot) {
       import.meta.hot.accept(acceptHMRUpdate(useSnackbarStore, import.meta.hot));
   }
   ```

---

## 🔧 Konfiguracja

### ESLint / Prettier

```json
// .prettierrc.json
{
  "semi": false,           // Bez średników
  "singleQuote": true,     // Single quotes
  "printWidth": 100
}
```

### Quasar Config (kluczowe)

- **Router mode:** `hash` (dla GitHub Pages)
- **Public path:** `/tlenujemy/`
- **Boot files:** `wait-styles`, `axios`, `pinia`
- **Icon set:** `material-icons`
- **CSS:** `app.scss`
- **Framework plugins:** `Loading`

---

## 📦 Polecenia

```bash
npm install          # Instalacja zależności
npm run dev          # Uruchom dev server (quasar dev)
npm run build        # Build produkcyjny (SPA)
npm run deploy       # Build + deploy na GitHub Pages
npm run lint         # ESLint
npm run format       # Prettier
```

---

## 🧩 Komponenty Quasar (często używane)

```vue
<!-- Przyciski -->
<q-btn color="secondary" label="Dalej" @click="handler" />
<q-btn flat icon="close" />

<!-- Formularze -->
<q-input v-model="name" outlined label="Imię" />
<q-date v-model="date" color="secondary" dark />
<q-time v-model="time" format24h />

<!-- Stepper -->
<q-stepper v-model="step" animated contracted>
    <q-step :name="1" title="Krok 1" />
</q-stepper>

<!-- Layout -->
<q-page-container>
    <q-card flat bordered dark />
</q-page-container>

<!-- Feedback -->
<q-spinner-facebook color="white" size="4em" />
```

---

## 🔌 Firebase/Firestore

**Kolekcja:** `appointments`

**Struktura dokumentu:**
```javascript
{
    name: string,    // Imię klienta
    phone: string,   // Telefon (format: "XXX XXX XXX")
    date: string,    // Data (format Quasar date picker)
    time: string     // Godzina (format 24h)
}
```

---

## ⚠️ Uwagi Ważne

1. **Firebase config** jest hardcoded w `appointment.service.js` - do przeniesienia do zmiennych środowiskowych
2. **Responsywność** - używaj `useQuasar()` + `$q.screen.lt.md` dla sprawdzania mobile
3. **Animacje** - zdefiniowane jako CSS `@keyframes` + Vue `<Transition>`
4. **Lazy loading** - komponenty routingu są lazy-loadowane: `() => import('pages/...')`
5. **Język** - UI po polsku, kod/komentarze po polsku/angielsku

---

## 📋 Checklist przy dodawaniu nowego komponentu

- [ ] Folder `src/components/TlenovoNazwa/`
- [ ] Plik `TlenovoNazwa.vue` z `<script setup>`
- [ ] Prefix `Tlenovo` w nazwie
- [ ] SCSS scoped z BEM naming (`TlenovoNazwa__element`)
- [ ] Używaj zmiennych z `quasar.variables.scss`
- [ ] DefineProps/defineEmits dla interfejsu
- [ ] Komentarze JSDoc dla funkcji publicznych

---

*Ostatnia aktualizacja: 2026-01-15*
