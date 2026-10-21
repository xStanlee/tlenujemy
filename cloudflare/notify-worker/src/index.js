/**
 * Tlenovo Notify Worker
 * @description Przyjmuje rezerwację z formularza i wysyła powiadomienie przez bota Telegrama.
 * Token bota i lista odbiorców są tylko po stronie Workera – frontend przesyła wyłącznie dane rezerwacji.
 *
 * Konfiguracja (patrz README.md):
 *  - TELEGRAM_BOT_TOKEN  (secret)  token od @BotFather
 *  - TELEGRAM_CHAT_IDS   (secret)  identyfikatory czatów, rozdzielone przecinkami
 *  - ALLOWED_ORIGINS     (var)     dozwolone originy strony, rozdzielone przecinkami
 *  - ALLOW_LOCALHOST     (var)     "true" – dopuszcza http://localhost:<port> (dev)
 *  - RESERVATION_LIMITER (binding) limit zapytań na IP
 */

const MAX_BODY_BYTES = 2048

const PATTERNS = {
  name: /^[\p{L}\p{M}' .-]{2,60}$/u,
  phone: /^\d{3} ?\d{3} ?\d{3}$/,
  date: /^\d{4}\/\d{2}\/\d{2}$/,
  time: /^\d{2}:\d{2}$/,
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const cors = corsHeaders(origin, env)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: cors ? 204 : 403, headers: cors || {} })
    }

    const { pathname } = new URL(request.url)
    if (request.method !== 'POST' || pathname !== '/reservation') {
      return json({ error: 'Not found' }, 404, cors)
    }
    if (!cors) {
      return json({ error: 'Forbidden' }, 403)
    }

    if (env.RESERVATION_LIMITER) {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
      const { success } = await env.RESERVATION_LIMITER.limit({ key: ip })
      if (!success) {
        return json({ error: 'Too many requests' }, 429, cors)
      }
    }

    const reservation = await parseReservation(request)
    if (!reservation) {
      return json({ error: 'Invalid reservation' }, 400, cors)
    }

    const chatIds = (env.TELEGRAM_CHAT_IDS || '')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean)
    if (!env.TELEGRAM_BOT_TOKEN || !chatIds.length) {
      console.error('Brak konfiguracji TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_IDS')
      return json({ error: 'Not configured' }, 500, cors)
    }

    const text = formatMessage(reservation)
    const results = await Promise.allSettled(
      chatIds.map((chatId) => sendTelegramMessage(env.TELEGRAM_BOT_TOKEN, chatId, text)),
    )
    const sent = results.filter((r) => r.status === 'fulfilled').length
    results
      .filter((r) => r.status === 'rejected')
      .forEach((r) => console.error('Telegram:', r.reason?.message || r.reason))

    return json({ ok: sent > 0, sent, total: chatIds.length }, sent > 0 ? 200 : 502, cors)
  },
}

function corsHeaders(origin, env) {
  const allowed = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
  const isLocalhost =
    env.ALLOW_LOCALHOST === 'true' && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)

  if (!allowed.includes(origin) && !isLocalhost) {
    return null
  }
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

async function parseReservation(request) {
  try {
    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) return null
    const body = JSON.parse(raw)

    const reservation = {}
    for (const [key, pattern] of Object.entries(PATTERNS)) {
      const value = typeof body[key] === 'string' ? body[key].trim() : ''
      if (!pattern.test(value)) return null
      reservation[key] = value
    }
    return reservation
  } catch {
    return null
  }
}

function formatMessage({ name, phone, date, time }) {
  const [year, month, day] = date.split('/')
  const digits = phone.replace(/\D/g, '')

  return [
    '🩺 <b>Nowa rezerwacja – Tlenovo</b>',
    '',
    `👤 ${escapeHtml(name)}`,
    `📞 +48 ${digits.replace(/(\d{3})(?=\d)/g, '$1 ')}`,
    `📅 ${day}.${month}.${year}, godz. ${time}`,
  ].join('\n')
}

async function sendTelegramMessage(token, chatId, text) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  })
  if (!response.ok) {
    throw new Error(`chat ${chatId}: HTTP ${response.status} ${await response.text()}`)
  }
}

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function json(data, status, cors) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...(cors || {}) },
  })
}
