
/**
 * LogService - Warstwa abstrakcji dla operacji console
 * Zapewnia spójny interfejs dla logowania w aplikacji
 */
class LogService {
    #rootStyle = getComputedStyle(document.documentElement);
    
    #info = this.#rootStyle.getPropertyValue('--q-info').trim();
    #error = this.#rootStyle.getPropertyValue('--q-negative').trim();
    #warn = this.#rootStyle.getPropertyValue('--q-warning').trim();
    #attention = this.#rootStyle.getPropertyValue('--q-attention').trim();

    /**
   * Loguje informację na poziomie debug
   * @param {string} message - Wiadomość do zalogowania
   * @param {any} data - Dodatkowe dane do zalogowania
   */
  debug(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data);
    }
  }

  /**
   * Loguje informację na poziomie info
   * @param {string} message - Wiadomość do zalogowania
   * @param {any} data - Dodatkowe dane do zalogowania
   */
  info(message) {
    console.info(
        `%c[INFO]: %c${message}`, 
        `color: ${this.#info};font-size: 16px;`, 
        `color: ${this.#info}; font-size: 16px; text-decoration: underline;`
    );
  }

  /**
   * Loguje informację na poziomie log
   * @param {string} message - Wiadomość do zalogowania
   * @param {any} data - Dodatkowe dane do zalogowania
   */
  log(message, data) {
    if(!data) {
        console.log(
            `%c[LOG]: %c${message}`, 
            `color: ${this.#attention}; font-size: 12px;; font-weigth: 700;`, 
            `color: ${this.#attention}; font-size: 12px;; font-weigth: 700;`
        );
    } else {
        console.log(
            `%c[LOG]: %c${message} ➔`,
            `color: ${this.#attention}; font-size: 12px;; font-weigth: 700;`,
            `color: ${this.#attention}; font-size: 12px;; font-weigth: 700;`, 
            // Dodatkowo wyświetlany obiekt
            data, 
        );
    }
  }

  /**
   * Loguje ostrzeżenie
   * @param {string} message - Wiadomość do zalogowania
   * @param {any} data - Dodatkowe dane do zalogowania
   */
  warn(message, data = null) {
    if(!data) {
        console.log(
            `%c[WARN]: %c${message}`, 
            `color: ${this.#warn}; font-size: 16px;`, 
            `color: ${this.#warn}; font-size: 16px; text-decoration: underline;`
        );
    } else {
        console.log(
            `%c[WARN]: %c${message}`, 
            `color: ${this.#warn}; font-size: 16px;`, 
            `color: ${this.#warn}; font-size: 16px; text-decoration: underline;`, 
            // Dodatkowo wyświetlany obiekt
            data, 
        );
    }
  }

  /**
   * Loguje błąd
   * @param {string} message - Wiadomość do zalogowania
   * @param {any} data - Dodatkowe dane do zalogowania
   */
  error(message, data = null) {
    if(!data) {
        console.log(
            `%c[ERROR]: %c${message}`, 
            `color: ${this.#error}; font-size: 20px;`, 
            `color: ${this.#error}; font-size: 20px; text-decoration: underline;`
        );
    } else {
        console.log(
            `%c[ERROR]: %c${message}`, 
            `color: ${this.#error}; font-size: 20px;`, 
            `color: ${this.#error}; font-size: 20px; text-decoration: underline;`, 
            // Dodatkowo wyświetlany obiekt
            data, 
        );
    }
  }

  /**
   * Loguje błąd z pełnym stack trace
   * @param {Error} error - Obiekt błędu
   * @param {string} context - Kontekst błędu
   */
  errorWithStack(error, context = '') {
    const contextMessage = context ? `[${context}] ` : '';
    console.error(`${contextMessage}${error.message}`, error.stack);
  }

  /**
   * Grupuje logi w konsoli
   * @param {string} groupName - Nazwa grupy
   * @param {Function} callback - Funkcja zawierająca logi do zgrupowania
   */
  group(groupName, callback) {
    console.group(groupName);
    try {
      callback();
    } finally {
      console.groupEnd();
    }
  }

  /**
   * Grupuje logi w konsoli (collapsed)
   * @param {string} groupName - Nazwa grupy
   * @param {Function} callback - Funkcja zawierająca logi do zgrupowania
   */
  groupCollapsed(groupName, callback) {
    console.groupCollapsed(groupName);
    try {
      callback();
    } finally {
      console.groupEnd();
    }
  }

  /**
   * Mierzy czas wykonania funkcji
   * @param {string} label - Etykieta dla pomiaru czasu
   * @param {Function} fn - Funkcja do zmierzenia
   * @returns {any} - Wynik funkcji
   */
  time(label, fn) {
    console.time(label);
    try {
      const result = fn();
      return result;
    } finally {
      console.timeEnd(label);
    }
  }

  /**
   * Loguje tabelę danych
   * @param {Array|Object} data - Dane do wyświetlenia w tabeli
   * @param {Array} columns - Kolumny do wyświetlenia (opcjonalne)
   */
  table(data, columns = null) {
    if (columns) {
      console.table(data, columns);
    } else {
      console.table(data);
    }
  }

  /**
   * Sprawdza czy warunek jest prawdziwy
   * @param {boolean} condition - Warunek do sprawdzenia
   * @param {string} message - Wiadomość w przypadku błędu
   */
  assert(condition, message) {
    console.assert(condition, message);
  }

  /**
   * Czyści konsolę
   */
  clear() {
    console.clear();
  }

  /**
   * Loguje licznik
   * @param {string} label - Etykieta licznika
   */
  count(label = 'default') {
    console.count(label);
  }

  /**
   * Resetuje licznik
   * @param {string} label - Etykieta licznika
   */
  countReset(label = 'default') {
    console.countReset(label);
  }

  /**
   * Loguje trace stack
   * @param {string} message - Wiadomość do zalogowania
   */
  trace(message = '') {
    console.trace(message);
  }

  /**
   * Loguje obiekt w formacie JSON
   * @param {any} obj - Obiekt do zalogowania
   * @param {string} label - Etykieta (opcjonalna)
   */
  json(obj, label = '') {
    const jsonString = JSON.stringify(obj, null, 2);
    if (label) {
      console.log(`${label}:`, jsonString);
    } else {
      console.log(jsonString);
    }
  }
}

// Tworzenie instancji singleton
const logService = new LogService();

// Eksport domyślny
export default logService;

// Eksport klasy dla przypadków gdy potrzebna jest nowa instancja
export { LogService };

