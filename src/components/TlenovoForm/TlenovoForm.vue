<template>
    <div class="TlenovoForm">
        <q-btn class="TlenovoForm__closeBtn" flat icon="close" @click="onCancelClickHandler" aria-label="Close"
            size="lg" />

        <h4 v-if="showHeader" class="TlenovoForm__formHeader">Rezerwacja terminu</h4>

        <div class="TlenovoForm__shape"></div>

        <form class="TlenovoForm__body" ref="formRef">
            <!-- Date/Time Selection Step -->
            <div class="TlenovoForm__step">
                <!-- Date Picker -->
                <q-date v-if="firstStep" v-model="date" class="TlenovoForm__datePicker" name="Data"
                    subtitle="Wybierz dzień" :locale="localeDate" color="secondary" dark bordered flat />

                <!-- Time Picker -->
                <q-time v-if="secondStep" v-model="time" class="TlenovoForm__timePicker" name="Godzina"
                    subtitle="Wybierz godzinę" :locale="localeDate" color="secondary" dark bordered format24h
                    :hour-options="hourOptions" :minute-options="minuteOptions" />

                <!-- Contact Info Step -->
                <q-card v-if="finalStep" flat bordered dark class="TlenovoForm__successInfo">
                    <q-card-section :class="{ 'TlenovoForm__successInfoText': isSubmitted }">
                        <span class="TlenovoForm__header">Uzupełnij dane kontaktowe</span>
                    </q-card-section>

                    <q-card-section :class="{ 'TlenovoForm__successInfoText': isSubmitted }">
                        <q-input v-model="name" name="Imie" class="TlenovoForm__input" outlined label-color="primary"
                            bg-color="white" label="Imię" autofocus clearable clear-icon="clear" :maxlength="20" />
                        <q-input :model-value="phone" name="Telefon" class="TlenovoForm__input" outlined
                            label-color="primary" bg-color="white" label="Numer telefonu" prefix="(+48) " clearable
                            clear-icon="clear" :maxlength="11" @update:model-value="onPhoneInputChangeHandler" />
                        Twoja rezerwacja jest już prawie gotowa. Wystarczy, że wypełnisz powyższe dane i klikniesz
                        przycisk "Rezerwuj".
                    </q-card-section>

                    <q-separator dark inset />

                    <q-card-section :class="{ 'TlenovoForm__successInfoText': isSubmitted }">
                        Upewnij się, że zapoznałeś się z regulaminem i przeciwwskazaniami dot. hiperbarii, które
                        znajdziesz
                        <span @click="onRedirectHandler" class="TlenovoForm__successInfoSpan">tutaj.</span>
                    </q-card-section>

                    <q-spinner-facebook v-if="isSubmitted" class="TlenovoForm__successInfoSpinner" color="white"
                        size="4em" />
                </q-card>
            </div>

            <!-- Stepper Navigation -->
            <q-stepper v-model="step" class="TlenovoForm__actionsStepper" ref="stepper" color="secondary" dark flat
                bordered animated contracted>
                <!-- Step 1: Date Selection -->
                <q-step :name="1" icon="place" title="Wybierz dzień" active-color="secondary" active-icon="event"
                    done-color="positive" :done="step > 1">
                    Wybierz dogodny termin wizyty.
                    <q-stepper-navigation>
                        <q-btn :disable="isNextDisabled" @click="onNextStepButtonHandler" color="secondary"
                            label="Dalej" />
                        <q-btn v-if="step > 1" flat color="secondary" @click="onPrevStepButtonHandler" label="Cofnij"
                            class="q-ml-sm" />
                    </q-stepper-navigation>
                </q-step>

                <!-- Step 2: Time Selection -->
                <q-step :name="2" icon="access_time" active-icon="access_time" title="Wybierz godzinę"
                    active-color="secondary" done-color="positive" :done="step > 2">
                    Wybierz godzinę zabiegu.
                    <q-stepper-navigation>
                        <q-btn :disable="isNextDisabled" @click="onNextStepButtonHandler" color="secondary"
                            label="Zatwierdź" />
                        <q-btn v-if="step > 1" flat color="secondary" @click="onPrevStepButtonHandler" label="Cofnij"
                            class="q-ml-sm" />
                    </q-stepper-navigation>
                </q-step>

                <!-- Step 3: Confirmation -->
                <q-step :name="3" title="Zatwierdź rezerwację" active-color="secondary" icon="beenhere"
                    active-icon="beenhere" done-color="positive">
                    Potwierdź swoją rezerwację.
                    <q-stepper-navigation>
                        <q-btn :disable="isNextDisabled" @click="onReserveButtonHandler" color="secondary"
                            label="Rezerwuj" />
                        <q-btn v-if="step > 1" flat color="secondary" @click="onPrevStepButtonHandler" label="Cofnij"
                            class="q-ml-sm" />
                    </q-stepper-navigation>
                </q-step>
            </q-stepper>
        </form>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { hourOptions, localeDate, minuteOptions } from './TlenovoForm.date.js';

// Props definition
defineProps({
    // Define your props here
    // example: initialData: { type: Object, default: () => ({}) }
});

// Lifecycle hooks
onMounted(() => {
    // Initialization code here
});

// Emits definition
const emit = defineEmits(['submit', 'cancel', 'redirect']);

// Refs
const formRef = ref();
const stepper = ref();
const step = ref(1);
const isSubmitted = ref(false);

// Data form
const time = ref();
const date = ref();
const name = ref();
const phone = ref();

const showHeader = computed(() => {
    return firstStep.value && !date.value;
});

// Computed properties
const firstStep = computed(() => {
    return step.value === 1;
});

const secondStep = computed(() => {
    return step.value === 2;
});

const thirdStep = computed(() => {
    return step.value === 3;
});
const finalStep = thirdStep;

const isNextDisabled = computed(() => {
    if (step.value === 1) {
        return !date.value;
    } else if (step.value === 2) {
        return !time.value;
    } else if (step.value === 3) {
        return !name.value || !phone.value || phone.value.length < 11;
    }
    return false;
});

// Methods
function clearForm() {
    stepper.value = null;
    date.value = null;
    time.value = null;
    name.value = null;
    phone.value = null;
    formRef.value = null;
    step.value = 1;
}

// Expose methods to parent component
defineExpose({
    clearForm
});

function onCancelClickHandler() {
    clearForm();
    emit('cancel');
}

function onReserveButtonHandler() {
    isSubmitted.value = true;

    setTimeout(() => {
        emit('submit', {
            date: date.value,
            time: time.value,
            name: name.value,
            phone: phone.value.trim()
        });
        // Form is now cleared by parent component after async actions complete
        isSubmitted.value = false;
    }, 2000);
}

function onPhoneInputChangeHandler(payload) {
    // Remove any existing spaces
    const digitsOnly = payload.replace(/\s/g, '');

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

function onNextStepButtonHandler() {
    stepper.value.next();
}

function onPrevStepButtonHandler() {
    stepper.value.previous();
}

function onRedirectHandler() {
    emit('redirect');
}
</script>

<style lang="scss" scoped>
.TlenovoForm {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: $primary;
    border-top: 1px solid $white;
    z-index: 8;
    position: relative;

    &__formHeader {
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.2;
        text-decoration: underline;
        margin: 1.5rem auto 0 auto;
        color: $white;
        z-index: 7;
    }

    &__closeBtn {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        color: $white;
        z-index: 7;
    }

    &__header {
        font-size: 1.3rem;
        font-weight: 600;
        line-height: 1.3;
    }

    &__shape {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, $secondary 0%, lighten($secondary, 15%) 50%, $secondary 100%);
        opacity: 0.8;
        clip-path: polygon(0% 0, 50% 0, 60% 0%, 0 100%);
        z-index: 5;
    }

    &__step {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0 0.5rem;
        z-index: 6;
    }

    &__timePicker {
        margin: 0 auto 1rem auto;
        max-width: 290px;
    }

    &__datePicker {
        margin: 0 auto 1rem auto;
        max-width: 290px;
    }

    &__input {
        margin-bottom: 1rem;

        // Overwrite Quasar styles
        :deep(.q-icon) {
            color: #000;
        }
    }

    &__successInfo {
        position: relative;
        margin: 0 0.75rem 1rem 0.75rem;
        padding: 1rem;
    }

    &__successInfoText {
        opacity: 0.4;
        filter: blur(2px);
    }

    &__successInfoSpan {
        background: linear-gradient(45deg, $secondary, lighten($secondary, 20%));
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
        text-decoration: underline;
        cursor: pointer;

        &:visited {
            background: linear-gradient(45deg, $secondary, lighten($secondary, 20%));
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            -webkit-text-fill-color: transparent;
        }

        &:hover {
            background: linear-gradient(45deg, $primary, lighten($primary, 15%));
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            -webkit-text-fill-color: transparent;
            text-decoration: none;
        }
    }

    &__successInfoSpinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &__body {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        max-height: calc(100% - 50px);
        overflow-y: auto;
        z-index: 6;
    }

    &__actionsStepper {

        // Overwrite Quasar styles
        :deep(.q-stepper__step-inner) {
            font-size: 20px;
        }
    }
}
</style>