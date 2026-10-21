# tlenovo-notify – powiadomienia o rezerwacjach przez Telegram

Strona wysyła `POST /reservation` z danymi `{name, phone, date, time}`. Worker sprawdza dane i wysyła wiadomość od bota Telegrama na każdy czat z listy `TELEGRAM_CHAT_IDS`. Token bota i lista odbiorców istnieją tylko w Cloudflare, nie ma ich w kodzie strony.

Zabezpieczenia:
- CORS przepuszcza tylko originy z `ALLOWED_ORIGINS`.
- Limit to 5 zapytań na minutę z jednego IP.
- Każde pole jest walidowane, a odbiorcy nie dają się podmienić z poziomu strony.

## 1. Bot Telegrama
1. W Telegramie otwórz **@BotFather**, wyślij `/newbot`, podaj nazwę (np. `Tlenovo Rezerwacje`) i login kończący się na `bot`.
2. Skopiuj **token** (np. `123456:ABC...`). Traktuj go jak hasło.

## 2. Chat ID odbiorców
Każda osoba, która ma dostawać powiadomienia:
1. Otwiera swojego bota w Telegramie i wysyła mu dowolną wiadomość, np. `/start`. Bez tego bot nie może do niej napisać.
2. Następnie otwórz w przeglądarce: `https://api.telegram.org/bot<TOKEN>/getUpdates`
3. W odpowiedzi znajdź `"chat":{"id":123456789,...}`. To jest chat ID danej osoby.

**Wersja z grupą:** załóż grupę, dodaj do niej bota i wszystkie osoby, napisz coś w grupie i odczytaj ID grupy z `getUpdates`. Takie ID jest ujemne, np. `-1001234567890`. Wtedy wystarczy jedno ID, a osoby dodajesz i usuwasz w samym Telegramie.

## 3. Wdrożenie (Cloudflare, plan darmowy)
```bash
cd cloudflare/notify-worker
npx wrangler login
npx wrangler secret put TELEGRAM_BOT_TOKEN   # wklej token
npx wrangler secret put TELEGRAM_CHAT_IDS    # np. 123456789,987654321
npx wrangler deploy
```
Po wdrożeniu Worker jest dostępny pod `https://tlenovo-notify.<subdomena>.workers.dev`. Frontend domyślnie wywołuje `https://tlenovo-notify.stachura-stanled.workers.dev`, czyli konto chatbota. Jeśli adres jest inny, zmień go w `src/services/notification.service.js`.

## 4. Test
```bash
curl -X POST https://tlenovo-notify.stachura-stanled.workers.dev/reservation \
  -H "Origin: https://xstanlee.github.io" -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"600 100 200","date":"2026/10/12","time":"14:00"}'
```
Oczekiwana odpowiedź to `{"ok":true,"sent":N,"total":N}` i wiadomość w Telegramie.

Zmiana odbiorców: `npx wrangler secret put TELEGRAM_CHAT_IDS` (bez ponownego deployu). Logi błędów: `npx wrangler tail`.
