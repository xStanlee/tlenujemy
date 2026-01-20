/**
 * ChatbotService - Serwis do komunikacji z AI Chatbot przez Cloudflare Worker
 * @description Obsługuje wysyłanie wiadomości do Gemini API przez proxy Cloudflare
 */

class ChatbotService {
    #apiUrl = 'https://tlenovo-ai-api.stachura-stanled.workers.dev'
    isProcessing = false

    /**
     * Wysyła wiadomość do chatbota i zwraca odpowiedź
     * @param {string} message - Wiadomość użytkownika
     * @param {Array<{role: string, text: string}>} history - Historia rozmowy (opcjonalna)
     * @returns {Promise<{success: boolean, answer?: string, error?: string}>}
     */
    async sendMessage(message, history = []) {
        this.isProcessing = true

        try {
            const response = await fetch(this.#apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message,
                    history
                })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (data.error) {
                throw new Error(data.error)
            }

            return {
                success: true,
                answer: data.answer
            }
        } catch (err) {
            console.error('Błąd podczas komunikacji z chatbotem:', err)
            return {
                success: false,
                error: err.message || 'Wystąpił błąd podczas komunikacji z asystentem.'
            }
        } finally {
            this.isProcessing = false
        }
    }
}

export const chatbotService = new ChatbotService()
