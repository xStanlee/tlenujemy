import { onMounted, onUnmounted } from "vue";

/**
 * Tryb osadzony – aplikacja wyrenderowana w iframe ekranu PhoneEmulator (desktop).
 * Wewnątrz iframe media queries, jednostki vw/vh i $q.screen odpowiadają rozmiarowi
 * ekranu telefonu, więc widok jest identyczny jak na smartfonie.
 */
const EMBEDDED_QUERY_PARAM = "embedded";

export const EMBEDDED_MESSAGES = Object.freeze({
    // Desktop (chatbot poza telefonem) -> iframe: otwórz formularz rezerwacji
    BOOK_REQUEST: "tlenovo:book-request",
});

export const isEmbedded =
    typeof window !== "undefined" &&
    window.parent !== window &&
    new URLSearchParams(window.location.search).get(EMBEDDED_QUERY_PARAM) === "1";

/**
 * Composable do komunikacji między stroną desktopową a aplikacją w iframe emulatora
 * @returns {Object} API trybu osadzonego
 */
export function useEmbeddedMode() {
    /**
     * Adres aplikacji do załadowania w iframe emulatora
     * @returns {string}
     */
    function getEmbeddedAppUrl() {
        return `${window.location.pathname}?${EMBEDDED_QUERY_PARAM}=1#/`;
    }

    /**
     * Wysyła komunikat do aplikacji w iframe
     * @param {HTMLIFrameElement} frame - iframe emulatora
     * @param {string} type - Typ komunikatu z EMBEDDED_MESSAGES
     */
    function sendToFrame(frame, type) {
        frame?.contentWindow?.postMessage({ type }, window.location.origin);
    }

    /**
     * Nasłuchuje komunikatów od strony nadrzędnej (tylko w trybie osadzonym)
     * @param {string} type - Typ komunikatu z EMBEDDED_MESSAGES
     * @param {Function} handler - Funkcja wywoływana po otrzymaniu komunikatu
     */
    function onParentMessage(type, handler) {
        function onMessage(event) {
            if (event.origin !== window.location.origin || event.source !== window.parent) return;
            if (event.data?.type === type) handler(event.data);
        }

        onMounted(() => {
            if (isEmbedded) window.addEventListener("message", onMessage);
        });

        onUnmounted(() => {
            window.removeEventListener("message", onMessage);
        });
    }

    return { isEmbedded, getEmbeddedAppUrl, sendToFrame, onParentMessage };
}
