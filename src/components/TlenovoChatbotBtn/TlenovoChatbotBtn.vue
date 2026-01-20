<template>
    <button :class="{
        'TlenovoChatbotBtn': true,
        'TlenovoChatbotBtn--pulse': pulse
    }" @click="onClickHandler">
        <q-icon name="chat" size="md" />
    </button>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const emit = defineEmits(['click'])

const pulse = ref(false)
let interval

onMounted(() => {
    interval = setInterval(() => {
        pulse.value = true

        setTimeout(() => {
            pulse.value = false
        }, 1500) // Animation duration
    }, 6000) // Every 6 seconds
})

onUnmounted(() => {
    clearInterval(interval)
})

function onClickHandler() {
    emit('click')
}
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.TlenovoChatbotBtn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 66px;
    height: 66px;
    padding: 12px;

    background: linear-gradient(135deg, $primary 0%, darken($primary, 10%) 100%);
    border: none;
    border-radius: 50%;
    cursor: pointer;

    -webkit-box-shadow: 2px 2px 31px 2px rgba($white, 0.7);
    -moz-box-shadow: 2px 2px 31px 2px rgba($white, 0.7);
    box-shadow: 2px 2px 31px 2px rgba($white, 0.7);

    color: $white;

    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba($primary, 0.4);
    }

    &--pulse {
        animation: pulse 1.5s ease-in-out;
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 2px 2px 31px 2px rgba($white, 0.7);
    }

    50% {
        transform: scale(1.15);
        box-shadow: 0 0 40px 8px rgba($secondary, 0.8);
    }

    100% {
        transform: scale(1);
        box-shadow: 2px 2px 31px 2px rgba($white, 0.7);
    }
}
</style>
