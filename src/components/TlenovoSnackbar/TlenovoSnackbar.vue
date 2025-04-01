<template>
    <Transition name="snackbar-slide">
        <q-card v-if="false" class="TlenovoSnackbar" flat bordered dark>
            <div class="TlenovoSnackbar__content">          
                <span class="TlenovoSnackbar__message">Message bedzie brany ze storea</span>
                <q-icon class="TlenovoSnackbar__icon" name="check_circle_outline" :color="color" size="lg" />
            </div>
        </q-card>
    </Transition>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
    color: {
        type: String,
        default: 'positive',
        validator: (value) => ['positive', 'negative', 'primary', 'secondary'].includes(value)
    },
    timeout: {
        type: Number,
        default: 3000
    },
    dismissible: {
        type: Boolean,
        default: true
    },
    modelValue: {
        type: Boolean,
        default: false
    }
});

// TODO: Use pinia to manage snackbar state
const visible = ref(false);

onMounted(() => {
    setTimeout(() => {
        visible.value = true;
    }, 3000);
});

watch(() => props.modelValue, (newValue) => {
    visible.value = newValue;
    if (newValue && props.timeout > 0) {
        setTimeout(() => {
            close();
        }, props.timeout);
    }
});
</script>

<style lang="scss" scoped>
// Transition animations
.snackbar-slide-enter-active,
.snackbar-slide-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.snackbar-slide-enter-from,
.snackbar-slide-leave-to {
    transform: translateY(100%) translateX(-50%);
    opacity: 0;
}

.snackbar-slide-enter-to,
.snackbar-slide-leave-from {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
}

.TlenovoSnackbar {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    min-width: 320px;
    padding: 16px;
    z-index: 10;

    &__content {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
    }

    &__message {
        margin-right: 16px;
        text-align: center;
    }
}
</style>