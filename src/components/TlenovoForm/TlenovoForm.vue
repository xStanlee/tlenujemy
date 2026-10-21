<template>
    <div :class="['TlenovoForm', {
        'TlenovoForm--keyboard': isKeyboardOpen
    }]" :style="viewportStyle" @keydown.esc="onCancelClickHandler">
        <!-- Panel wysuwany od dołu – wysokość dopasowana do treści kroku -->
        <div class="TlenovoForm__sheet" role="dialog" aria-modal="true" aria-labelledby="TlenovoFormTitle">
            <div class="TlenovoForm__shape"></div>

            <!-- Header: tytuł, postęp, podsumowanie wyboru -->
            <header class="TlenovoForm__top">
                <div class="TlenovoForm__titleRow">
                    <h4 id="TlenovoFormTitle" class="TlenovoForm__title">Rezerwacja terminu</h4>
                    <q-btn class="TlenovoForm__closeBtn" flat round dense icon="close" aria-label="Zamknij"
                        :disable="isSubmitted" @click="onCancelClickHandler" />
                </div>

                <div class="TlenovoForm__progress" aria-hidden="true">
                    <span v-for="item in steps" :key="item.id" :class="['TlenovoForm__progressBar', {
                        'TlenovoForm__progressBar--active': item.id === step,
                        'TlenovoForm__progressBar--done': item.id < step
                    }]"></span>
                </div>

                <p class="TlenovoForm__stepLabel">
                    Krok {{ step }} z {{ steps.length }} · <strong>{{ currentStep.title }}</strong>
                </p>

                <div v-if="date || time" class="TlenovoForm__summary">
                    <q-chip v-if="date" class="TlenovoForm__summaryChip" icon="event" clickable dense
                        :disable="isSubmitted" @click="goToStep(1)">
                        {{ formattedDate }}
                    </q-chip>
                    <q-chip v-if="time" class="TlenovoForm__summaryChip" icon="schedule" clickable dense
                        :disable="isSubmitted" @click="goToStep(2)">
                        {{ time }}
                    </q-chip>
                </div>
            </header>

            <!-- Content: przewijana treść aktualnego kroku -->
            <form class="TlenovoForm__content" ref="contentRef" novalidate @submit.prevent="onPrimaryActionHandler"
                @focusin="onFieldFocusHandler">
                <div class="TlenovoForm__step">
                    <p class="TlenovoForm__description">{{ currentStep.description }}</p>

                    <!-- Step 1: Date -->
                    <q-date v-if="step === 1" v-model="date" class="TlenovoForm__picker" :locale="localeDate"
                        color="secondary" dark bordered flat minimal :options="dateOptions" />

                    <!-- Step 2: Time -->
                    <q-time v-else-if="step === 2" v-model="time" class="TlenovoForm__picker" :locale="localeDate"
                        color="secondary" dark bordered flat format24h :landscape="isCompactHeight"
                        :hour-options="filteredHourOptions" :minute-options="filteredMinuteOptions" />

                    <!-- Step 3: Contact -->
                    <div v-else class="TlenovoForm__contact">
                        <q-input ref="nameInputRef" v-model="name" class="TlenovoForm__input" outlined
                            label-color="primary" bg-color="white" label="Imię" autocomplete="given-name"
                            enterkeyhint="next" :maxlength="20" :disable="isSubmitted" clearable clear-icon="clear"
                            @keydown.enter.prevent="onNameEnterHandler" />

                        <q-input ref="phoneInputRef" :model-value="phone" class="TlenovoForm__input" outlined
                            label-color="primary" bg-color="white" label="Numer telefonu" prefix="(+48) " type="tel"
                            inputmode="numeric" autocomplete="tel-national" enterkeyhint="done" :maxlength="11"
                            :disable="isSubmitted" hint="9 cyfr, np. 600 123 456" :error="isPhoneError"
                            error-message="Numer telefonu musi mieć 9 cyfr" clearable clear-icon="clear"
                            @update:model-value="onPhoneInputChangeHandler" @blur="isPhoneTouched = true" />

                        <p class="TlenovoForm__info">
                            Zadzwonimy, aby potwierdzić rezerwację. Upewnij się, że zapoznałeś się z regulaminem
                            i przeciwwskazaniami dot. hiperbarii, które znajdziesz
                            <span class="TlenovoForm__link" role="link" tabindex="0" @click="onRedirectHandler"
                                @keydown.enter="onRedirectHandler">tutaj</span>.
                        </p>
                    </div>
                </div>

                <!-- Submit overlay -->
                <div v-if="isSubmitted" class="TlenovoForm__submitting">
                    <q-spinner-facebook color="white" size="4em" />
                    <span>Wysyłamy rezerwację…</span>
                </div>
            </form>

            <!-- Footer: akcje zawsze widoczne (także nad klawiaturą) -->
            <footer class="TlenovoForm__actions">
                <q-btn v-if="step > 1" class="TlenovoForm__actionBtn" flat color="white" label="Cofnij"
                    icon="chevron_left" :disable="isSubmitted" @click="onPrevStepButtonHandler" />
                <q-btn class="TlenovoForm__actionBtn TlenovoForm__actionBtn--primary" color="secondary"
                    text-color="primary" unelevated :label="currentStep.actionLabel"
                    :icon-right="step === steps.length ? 'check' : 'chevron_right'" :disable="isNextDisabled"
                    :loading="isSubmitted" @click="onPrimaryActionHandler" />
            </footer>
        </div>
    </div>
</template>

<script setup>
import { date as dateUtils, useQuasar } from 'quasar';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { hourOptions as baseHourOptions, minuteOptions as baseMinuteOptions, localeDate } from './TlenovoForm.date.js';

const emit = defineEmits(['submit', 'cancel', 'redirect']);

const $q = useQuasar();

const steps = [
    { id: 1, title: 'Wybierz dzień', description: 'Wybierz dogodny dzień wizyty.', actionLabel: 'Dalej' },
    { id: 2, title: 'Wybierz godzinę', description: 'Wybierz godzinę zabiegu.', actionLabel: 'Dalej' },
    {
        id: 3,
        title: 'Dane kontaktowe',
        description: 'Twoja rezerwacja jest już prawie gotowa. Podaj imię i numer telefonu, a następnie kliknij "Rezerwuj".',
        actionLabel: 'Rezerwuj'
    }
];

// Refs
const contentRef = ref();
const nameInputRef = ref();
const phoneInputRef = ref();
const step = ref(1);
const isSubmitted = ref(false);
const isPhoneTouched = ref(false);

// Data form
const time = ref();
const date = ref();
const name = ref();
const phone = ref();

// Computed properties
const currentStep = computed(() => steps[step.value - 1]);

const isPhoneValid = computed(() => !!phone.value && phone.value.replace(/\D/g, '').length === 9);

const isPhoneError = computed(() => isPhoneTouched.value && !!phone.value && !isPhoneValid.value);

const isNextDisabled = computed(() => {
    if (step.value === 1) {
        return !date.value;
    } else if (step.value === 2) {
        return !time.value;
    } else if (step.value === 3) {
        return !name.value?.trim() || !isPhoneValid.value;
    }
    return false;
});

const formattedDate = computed(() => {
    if (!date.value) return '';
    const [year, month, day] = date.value.split('/').map(Number);
    return dateUtils.formatDate(new Date(year, month - 1, day), 'ddd, DD.MM.YYYY', localeDate);
});

// Niski i szeroki ekran (telefon poziomo) – zegar w trybie landscape zajmuje mniej wysokości
const isCompactHeight = computed(() => {
    return $q.screen.height < 560 && $q.screen.width > $q.screen.height;
});

// Check if selected date is today
function isSelectedDateToday() {
    if (!date.value) return false;
    const today = new Date();
    const [year, month, day] = date.value.split('/').map(Number);
    return (
        today.getFullYear() === year &&
        today.getMonth() + 1 === month &&
        today.getDate() === day
    );
}

// Get minimum allowed time (current time + 30 minutes)
function getMinAllowedTime() {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    return {
        hour: now.getHours(),
        minute: now.getMinutes()
    };
}

// Filtered hour options - only show hours from current+30min onwards if date is today
const filteredHourOptions = computed(() => {
    if (!isSelectedDateToday()) {
        return baseHourOptions;
    }

    const minTime = getMinAllowedTime();
    return baseHourOptions.filter(hour => hour >= minTime.hour);
});

// Filtered minute options - filter based on selected hour if date is today
const filteredMinuteOptions = computed(() => {
    if (!isSelectedDateToday()) {
        return baseMinuteOptions;
    }

    const minTime = getMinAllowedTime();

    // Parse currently selected hour from time value (format: HH:mm)
    // Default to min hour when no hour is selected yet (conservative filtering)
    let selectedHour = minTime.hour;
    if (time.value) {
        const [hourStr] = time.value.split(':');
        selectedHour = parseInt(hourStr, 10);
    }

    // If selected hour is greater than min hour, all minutes are available
    if (selectedHour > minTime.hour) {
        return baseMinuteOptions;
    }

    // If selected hour is the min hour (or less/not set), filter minutes to >= minTime.minute
    return baseMinuteOptions.filter(minute => minute >= minTime.minute);
});

// Po zmianie dnia wybrana wcześniej godzina może być już niedostępna (np. zmiana na dzisiaj)
watch(date, () => {
    if (!time.value) return;
    const [hour, minute] = time.value.split(':').map(Number);
    if (!filteredHourOptions.value.includes(hour) || !filteredMinuteOptions.value.includes(minute)) {
        time.value = null;
    }
});

// Date options filter - show dates from today, or from tomorrow if current time >= 20:00
function dateOptions(dateString) {
    const now = new Date();
    const currentHour = now.getHours();

    // Determine minimum selectable date
    const minDate = new Date(now);
    minDate.setHours(0, 0, 0, 0); // Reset to start of day

    // If current hour is 20:00 or later, minimum date is tomorrow
    if (currentHour >= 20) {
        minDate.setDate(minDate.getDate() + 1);
    }

    // Parse the date string from QDate format (YYYY/MM/DD)
    const [year, month, day] = dateString.split('/').map(Number);
    const checkDate = new Date(year, month - 1, day);
    checkDate.setHours(0, 0, 0, 0);

    return checkDate >= minDate;
}

// --- Klawiatura ekranowa / visual viewport ---
// Na telefonach klawiatura nie zmienia wysokości 100vh/100%, więc formularz dopasowujemy
// do visualViewport – dzięki temu przyciski akcji zawsze są tuż nad klawiaturą.
const viewportHeight = ref(null);
const viewportTop = ref(0);
const isKeyboardOpen = ref(false);

const KEYBOARD_THRESHOLD = 150;

const viewportStyle = computed(() => {
    if (viewportHeight.value === null) return null;
    return {
        height: `${viewportHeight.value}px`,
        top: `${viewportTop.value}px`
    };
});

function onViewportChange() {
    const viewport = window.visualViewport;
    if (!viewport) return;

    viewportHeight.value = viewport.height;
    viewportTop.value = viewport.offsetTop;
    isKeyboardOpen.value = window.innerHeight - viewport.height > KEYBOARD_THRESHOLD;
}

let focusTimeoutId = null;

function onFieldFocusHandler(event) {
    const target = event.target;
    if (!target?.matches?.('input, textarea')) return;

    // Poczekaj aż klawiatura się wysunie i viewport się przeliczy
    clearTimeout(focusTimeoutId);
    focusTimeoutId = setTimeout(() => {
        target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 300);
}

onMounted(() => {
    document.body.classList.add('TlenovoForm-open');
    onViewportChange();
    window.visualViewport?.addEventListener('resize', onViewportChange);
    window.visualViewport?.addEventListener('scroll', onViewportChange);
});

onBeforeUnmount(() => {
    clearTimeout(focusTimeoutId);
    clearTimeout(submitTimeoutId);
    document.body.classList.remove('TlenovoForm-open');
    window.visualViewport?.removeEventListener('resize', onViewportChange);
    window.visualViewport?.removeEventListener('scroll', onViewportChange);
});

// Methods
function clearForm() {
    date.value = null;
    time.value = null;
    name.value = null;
    phone.value = null;
    isPhoneTouched.value = false;
    step.value = 1;
}

// Expose methods to parent component
defineExpose({
    clearForm
});

function goToStep(targetStep) {
    if (isSubmitted.value) return;
    step.value = targetStep;
}

function scrollContentToTop() {
    nextTick(() => {
        contentRef.value?.scrollTo({ top: 0 });
    });
}

function onCancelClickHandler() {
    if (isSubmitted.value) return;
    clearForm();
    emit('cancel');
}

function onPrimaryActionHandler() {
    if (isNextDisabled.value || isSubmitted.value) return;

    if (step.value < steps.length) {
        step.value++;
        scrollContentToTop();
    } else {
        onReserveButtonHandler();
    }
}

let submitTimeoutId = null;

function onReserveButtonHandler() {
    isSubmitted.value = true;
    // Schowaj klawiaturę, żeby użytkownik widział stan wysyłania
    document.activeElement?.blur?.();

    // isSubmitted zostaje true – rodzic zamyka formularz po zakończeniu zapisu (blokada podwójnego wysłania)
    submitTimeoutId = setTimeout(() => {
        emit('submit', {
            date: date.value,
            time: time.value,
            name: name.value.trim(),
            phone: phone.value.trim()
        });
    }, 2000);
}

function onPhoneInputChangeHandler(payload) {
    // Keep digits only
    const digitsOnly = (payload ?? '').toString().replace(/\D/g, '');

    // Format with spaces after every 3 digits
    let formattedPhone = '';
    for (let i = 0; i < digitsOnly.length && i < 9; i++) {
        if (i > 0 && i % 3 === 0) {
            formattedPhone += ' ';
        }
        formattedPhone += digitsOnly[i];
    }

    phone.value = formattedPhone;
}

function onNameEnterHandler() {
    phoneInputRef.value?.focus();
}

function onPrevStepButtonHandler() {
    if (step.value > 1) {
        step.value--;
        scrollContentToTop();
    }
}

function onRedirectHandler() {
    emit('redirect');
}
</script>

<style lang="scss">
// Blokada przewijania strony pod otwartym formularzem (mobile)
body.TlenovoForm-open {
    overflow: hidden;
    overscroll-behavior: none;
}
</style>

<style lang="scss" scoped>
@use 'sass:color';

// Ponad q-header ($z-marginals: 2000), drawerami (3000), przyciskami pływającymi i chatbotem,
// ale poniżej menu/tooltipów/notify Quasara (6000+)
$form-z-index: 5000;

// Root = przyciemnione tło na cały (widoczny) ekran; __sheet = panel przyklejony do dołu,
// którego wysokość wynika z treści kroku (max. cały ekran – wtedy przewija się treść)
.TlenovoForm {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // Fallback gdy brak visualViewport – nadpisywane stylem inline
    height: 100vh;
    height: 100dvh;
    z-index: $form-z-index;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-top: max(1.5rem, env(safe-area-inset-top));
    background-color: rgba(#000, 0.55);
    color: $white;

    &__sheet {
        position: relative;
        flex: 0 1 auto;
        min-height: 0;
        max-height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: $primary;
        border-top: 1px solid rgba($white, 0.25);
        border-radius: 20px 20px 0 0;
        box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.35);
    }

    // Animacja otwierania/zamykania (Transition name="FormTransition" w TlenovoMainView):
    // tło się przyciemnia, panel wysuwa się od dołu
    &.FormTransition-enter-active,
    &.FormTransition-leave-active {
        transition: background-color 0.25s ease-out;

        .TlenovoForm__sheet {
            transition: transform 0.25s ease-out;
        }
    }

    &.FormTransition-enter-from,
    &.FormTransition-leave-to {
        background-color: transparent;

        .TlenovoForm__sheet {
            transform: translate3d(0, 100%, 0);
        }
    }

    &__shape {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, $secondary 0%, color.adjust($secondary, $lightness: 15%) 50%, $secondary 100%);
        opacity: 0.25;
        clip-path: polygon(0 0, 60% 0, 0 100%);
        pointer-events: none;
        z-index: 0;
    }

    // --- Header ---
    &__top {
        position: relative;
        z-index: 1;
        flex: 0 0 auto;
        padding: 1rem 1rem 0.5rem;
        border-bottom: 1px solid rgba($white, 0.15);
        background-color: rgba($primary, 0.85);
    }

    &__titleRow {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
    }

    &__title {
        margin: 0;
        font-size: clamp(1.25rem, 4.5vw, 1.6rem);
        font-weight: 800;
        line-height: 1.2;
    }

    &__closeBtn {
        flex: 0 0 auto;
        color: $white;
        font-size: 1rem;
    }

    &__progress {
        display: flex;
        gap: 0.375rem;
        margin-top: 0.75rem;
    }

    &__progressBar {
        flex: 1;
        height: 4px;
        border-radius: 2px;
        background-color: rgba($white, 0.25);
        transition: background-color 0.3s ease;

        &--active {
            background-color: $secondary;
        }

        &--done {
            background-color: $positive;
        }
    }

    &__stepLabel {
        margin: 0.5rem 0 0;
        font-size: 0.95rem;
        opacity: 0.9;
    }

    &__summary {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        margin-top: 0.375rem;
    }

    &__summaryChip {
        margin: 0;
        background-color: rgba($white, 0.12);
        color: $white;
        border: 1px solid rgba($white, 0.25);
    }

    // --- Content ---
    &__content {
        position: relative;
        z-index: 1;
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        padding: 1rem;
    }

    &__step {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        max-width: 560px;
        margin: 0 auto;
    }

    &__description {
        margin: 0 0 1rem;
        font-size: 1rem;
        line-height: 1.4;
        opacity: 0.9;
    }

    &__picker {
        width: 100%;
        max-width: 420px;
        margin: 0 auto;
    }

    &__contact {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    &__input {
        // Overwrite Quasar styles
        :deep(.q-icon) {
            color: #000;
        }

        :deep(.q-field__bottom) {
            color: rgba($white, 0.8);
        }

        :deep(.q-field--error .q-field__bottom),
        &.q-field--error :deep(.q-field__bottom) {
            color: $negative;
        }

        // 16px zapobiega automatycznemu przybliżaniu strony przez iOS przy fokusie
        :deep(input) {
            font-size: 16px;
        }
    }

    &__info {
        margin: 0.5rem 0 0;
        font-size: 0.95rem;
        line-height: 1.5;
        opacity: 0.9;
    }

    &__link {
        color: $secondary;
        font-weight: 600;
        text-decoration: underline;
        cursor: pointer;

        &:hover,
        &:focus-visible {
            text-decoration: none;
        }
    }

    &__submitting {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background-color: rgba($primary, 0.85);
        font-size: 1.05rem;
        z-index: 2;
    }

    // --- Footer (actions) ---
    &__actions {
        position: relative;
        z-index: 1;
        flex: 0 0 auto;
        display: flex;
        gap: 0.75rem;
        padding: 0.75rem 1rem max(0.75rem, env(safe-area-inset-bottom));
        border-top: 1px solid rgba($white, 0.15);
        background-color: rgba($primary, 0.95);
    }

    &__actionBtn {
        min-height: 48px;
        font-size: 1rem;
        font-weight: 600;

        &--primary {
            flex: 1;
        }
    }

    // --- Klawiatura otwarta: kompaktowy nagłówek, więcej miejsca na pola ---
    &--keyboard {
        padding-top: 0;

        .TlenovoForm__sheet {
            border-radius: 0;
        }

        .TlenovoForm__top {
            padding-bottom: 0.375rem;
        }

        .TlenovoForm__title {
            font-size: 1.1rem;
        }

        .TlenovoForm__progress {
            margin-top: 0.375rem;
        }

        .TlenovoForm__summary,
        .TlenovoForm__description {
            display: none;
        }

        .TlenovoForm__content {
            padding-top: 0.75rem;
        }

        .TlenovoForm__actions {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
        }
    }

    // Tablet / większe ekrany – wyśrodkowany panel o ograniczonej szerokości
    @media (min-width: 600px) {
        .TlenovoForm__sheet {
            max-width: 640px;
            margin: 0 auto;
            border-left: 1px solid rgba($white, 0.25);
            border-right: 1px solid rgba($white, 0.25);
        }

        .TlenovoForm__top,
        .TlenovoForm__actions {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }

        .TlenovoForm__content {
            padding: 1.5rem;
        }

        .TlenovoForm__step {
            max-width: none;
        }
    }

    // Niski ekran (telefon poziomo) – ściśnij nagłówek
    @media (max-height: 520px) {
        .TlenovoForm__title {
            font-size: 1.1rem;
        }

        .TlenovoForm__description {
            display: none;
        }
    }
}
</style>
