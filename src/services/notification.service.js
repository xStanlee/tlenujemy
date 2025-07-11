class NotificationService {
  #notificationChannel;
  isInitialized = false;
    
  constructor() {
    this.#notificationChannel = process.env.NOTIFICATION_CHANNEL || "public-42d1e8f7c2b94a5e8cdd0c51";
    this.isInitialized = true;
  }

  async sendReservationNotification(reservation) {
    // POST for reservation
    await fetch(`https://ntfy.sh/${this.#notificationChannel}`, {
        method: 'POST', 
        body: reservation,
        headers: {
            'Title': 'Umowienie rezerwacji (Tlenovo)',
            'Priority': 'urgent',
            'Tags': 'health_worker',
            // 'Priority': '5'
        }
    });

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