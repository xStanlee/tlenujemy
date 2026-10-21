class NotificationService {
  // Cloudflare Worker (cloudflare/notify-worker) – wysyła powiadomienie przez bota Telegrama
  #apiUrl;
  #notificationChannel;
  isInitialized = false;

  constructor() {
    this.#apiUrl = process.env.NOTIFY_API_URL || "https://tlenovo-notify.stachura-stanled.workers.dev";
    this.#notificationChannel = process.env.NOTIFICATION_CHANNEL || "public-42d1e8f7c2b94a5e8cdd0c51";
    this.isInitialized = true;
  }

  /**
   * Wysyła powiadomienie o rezerwacji. Błąd nie przerywa procesu rezerwacji (zapis jest w Firestore).
   * @param {{name: string, phone: string, date: string, time: string}} reservation
   * @returns {Promise<boolean>}
   */
  async sendReservationNotification(reservation) {
    try {
      const response = await fetch(`${this.#apiUrl}/reservation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return true;
    } catch (err) {
      console.error('Nie udało się wysłać powiadomienia o rezerwacji:', err);
      return false;
    }
  }

  async sendQuestionNotification(question) {
    // PUT for questions
    await fetch(`https://ntfy.sh/${this.#notificationChannel}`, {
        method: 'PUT',
        body: question,
        headers: {
          Title: 'Zapytanie (Tlenovo)',
          Priority: 'default',
          Tags: 'question',
          // 'Priority': '4'
        },
    });
  }
}

export const notificationService = new NotificationService();
