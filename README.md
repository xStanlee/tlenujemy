# Rental App Frontend (Quasar + Vue 3)

## 📂 Struktura projektu

```
/rental-app-frontend   # Projekt Quasar
│── /public            # Pliki publiczne (favicon, manifest itp.)
│── /src               # Kod źródłowy aplikacji
│   │── /assets        # Statyczne pliki (ikony, obrazy, style)
│   │── /boot          # Inicjalizacja bibliotek (Axios, Firebase itp.)
│   │── /components    # Komponenty wielokrotnego użytku (np. kalendarz rezerwacji)
│   │── /layouts       # Układy stron (np. nawigacja, stopka)
│   │── /pages         # Strony aplikacji
│   │── /router        # Routing aplikacji
│   │── /store         # Zarządzanie stanem aplikacji (Pinia lub Vuex)
│   │── /composables   # Logika biznesowa (np. obsługa rezerwacji)
│   │── App.vue        # Główny komponent aplikacji
│   │── main.js        # Punkt wejścia aplikacji
│── /quasar.config.js  # Konfiguracja Quasara
│── /package.json      # Dependencies i skrypty
```

## 📌 Kluczowe foldery i ich funkcje

| Folder | Opis |
|--------|------|
| **`/assets`** | Ikony, obrazy, pliki CSS |
| **`/boot`** | Inicjalizacja bibliotek (np. `axios`, `firebase`) |
| **`/components`** | Komponenty wielokrotnego użytku (np. kalendarz rezerwacji) |
| **`/layouts`** | Główne układy aplikacji (np. `MainLayout.vue`) |
| **`/pages`** | Widoki stron (np. `Home.vue`, `Booking.vue`) |
| **`/router`** | Konfiguracja tras (Vue Router) |
| **`/store`** | Zarządzanie stanem (Pinia/Vuex) |
| **`/composables`** | Logika aplikacji oparta na Vue 3 Composition API |

## 🚀 Jak uruchomić projekt

1. **Zainstaluj zależności**
   ```bash
   npm install
   ```

2. **Uruchom aplikację w trybie deweloperskim**
   ```bash
   quasar dev
   ```

3. **Budowanie wersji produkcyjnej**
   ```bash
   quasar build
   ```

## 🔗 Dalsze kroki

- 🔑 Integracja autoryzacji JWT
- 📆 Obsługa rezerwacji w Store (Pinia)
- 💳 Implementacja płatności (Stripe)
- 📩 Powiadomienia (SMS/E-mail)
