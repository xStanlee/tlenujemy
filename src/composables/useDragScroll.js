import { onMounted, onUnmounted } from "vue";

// Elementy z własną obsługą myszy (pola, przyciski, kalendarz, zegar) – nie przechwytujemy ich
const IGNORED_TARGETS =
    'input, textarea, select, button, a, [contenteditable="true"], .q-date, .q-time, .q-slider';
const DRAG_THRESHOLD = 5;
const MOMENTUM_DECAY = 325;

/**
 * Znajduje najbliższy przewijalny (w pionie) element nadrzędny
 * @param {Element} element - Element startowy
 * @returns {Element}
 */
function findScrollableParent(element) {
    let current = element;
    while (current && current !== document.body) {
        const { overflowY } = getComputedStyle(current);
        if (/(auto|scroll)/.test(overflowY) && current.scrollHeight > current.clientHeight) {
            return current;
        }
        current = current.parentElement;
    }
    return document.scrollingElement;
}

/**
 * Composable symulujący przewijanie palcem za pomocą myszy (przeciągnięcie + bezwładność).
 * Używany w trybie osadzonym (iframe w PhoneEmulator), gdzie użytkownik obsługuje "telefon" myszą.
 * @param {boolean} enabled - Czy włączyć obsługę
 */
export function useDragScroll(enabled) {
    let scrollable = null;
    let startY = 0;
    let startScrollTop = 0;
    let lastY = 0;
    let velocity = 0;
    let isPointerDown = false;
    let isDragging = false;
    let frame = 0;

    function stopMomentum() {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
    }

    function onMouseDown(event) {
        if (event.button !== 0 || event.target.closest?.(IGNORED_TARGETS)) return;

        stopMomentum();
        scrollable = findScrollableParent(event.target);
        startY = lastY = event.clientY;
        startScrollTop = scrollable.scrollTop;
        velocity = 0;
        isPointerDown = true;
        isDragging = false;
    }

    function onMouseMove(event) {
        if (!isPointerDown) return;

        const deltaY = event.clientY - startY;
        if (!isDragging && Math.abs(deltaY) < DRAG_THRESHOLD) return;

        isDragging = true;
        event.preventDefault();
        scrollable.scrollTop = startScrollTop - deltaY;
        velocity = (lastY - event.clientY) * 0.8;
        lastY = event.clientY;
    }

    function onMouseUp() {
        if (!isPointerDown) return;
        isPointerDown = false;
        if (!isDragging || Math.abs(velocity) <= 1) return;

        // Bezwładność po puszczeniu przycisku
        const amplitude = velocity;
        const startTime = Date.now();
        const target = scrollable;

        const step = () => {
            const delta = amplitude * Math.exp(-(Date.now() - startTime) / MOMENTUM_DECAY);
            if (Math.abs(delta) > 0.5) {
                target.scrollTop += delta;
                frame = requestAnimationFrame(step);
            } else {
                frame = 0;
            }
        };
        step();
    }

    // Kliknięcie kończące przeciąganie nie powinno aktywować elementu pod kursorem
    function onClickCapture(event) {
        if (isDragging) {
            event.preventDefault();
            event.stopPropagation();
            isDragging = false;
        }
    }

    onMounted(() => {
        if (!enabled) return;
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        document.documentElement.addEventListener("mouseleave", onMouseUp);
        document.addEventListener("click", onClickCapture, true);
    });

    onUnmounted(() => {
        stopMomentum();
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.documentElement.removeEventListener("mouseleave", onMouseUp);
        document.removeEventListener("click", onClickCapture, true);
    });
}
