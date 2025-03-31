<template>
    <div class="TlenovoFireflies">
        <span v-for="firefly in firefliesAmount" :key="firefly" :class="{
            'firefly': true,
            'firefly--mobile': isMobile
        }"></span>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    isMobile: Boolean,
})
// Fireflies amount
const firefliesAmount = ref(10);
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
