<template>
    <q-page-container>
        <h6 class="text-h6">Contact</h6>
        <p class="text-p">{{ message }}</p>
    </q-page-container>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Tutaj będzie strona kontaktowa!');
</script>

<style scoped>

</style>