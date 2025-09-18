<template>
    <div class="TlenovoFireflies">
        <span
            v-for="firefly in firefliesAmount"
            :key="firefly"
            :class="[
                'firefly',
                { 'firefly--mobile': isMobile }
            ]"
        ></span>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    isMobile: Boolean,
})
// Reduced fireflies amount for better performance
const firefliesAmount = ref(5);
</script>

<style scoped>
@import './TlenovoFireflies.scss';

.TlenovoFireflies {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>
