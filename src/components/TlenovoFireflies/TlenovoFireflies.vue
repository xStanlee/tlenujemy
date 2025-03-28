<template>
    <div class="TlenovoFireflies">
        <span v-for="firefly in firefliesAmount" :key="firefly" class="firefly"></span>
    </div>
</template>

<script setup>
import { ref } from 'vue';
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
