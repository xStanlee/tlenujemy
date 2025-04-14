<template>
    <q-page-container>
        <TlenovoFact
            title="Trees"
            subtitle="Kingdom: Plantae"
            image="https://assets.codepen.io/4787486/trees.png"
            insetImage="https://assets.codepen.io/4787486/oak_1.jpg"
            :content="[
                'Trees are woody perennial plants that are a member of the kingdom Plantae.',
                'Apart from providing oxygen for the planet and beauty when they bloom...',
                'When managed properly, trees are a good source of renewable energy...'
            ]"
        />
    </q-page-container>
</template>

<script setup>
import TlenovoFact from '../components/TlenovoFact/TlenovoFact.vue';
</script>

<style scoped>

</style>