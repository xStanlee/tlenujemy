<template>
    <Transition name="snackbar-slide">
        <q-card
            v-if="visible"
            class="TlenovoSnackbar"
            flat
            bordered
            dark
        >
            <div class="TlenovoSnackbar__content">
                <span class="TlenovoSnackbar__message">
                    {{ message }}
                </span>
                <q-icon
                    class="TlenovoSnackbar__icon"
                    :name="icon"
                    :color="color"
                    :size="iconSize"
                />
            </div>
        </q-card>
    </Transition>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useSnackbarStore } from 'src/stores/snackbar-store.js';

const useSnackbar = useSnackbarStore();
const { visible, message, color, icon, iconSize } = storeToRefs(useSnackbar);
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