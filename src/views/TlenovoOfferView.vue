<template>
    <q-page-container>
        <h6 class="text-h6">Mails</h6>
        <p class="text-p">{{ message }}</p>
    </q-page-container>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Welcome to the Main View!');
</script>

<style scoped>

</style>