<template>
    <q-page-container class="MainView">
        <!-- Background image first -->
        <div class="MainView__img"></div>

        <!-- Initial text -->
        <header class="MainView__header">
            <h1>{{ header }}</h1>
            <h3>{{ message }}</h3>
        </header>

        <!-- Main content -->
        <section class="MainView__belt">

        </section>
    </q-page-container>
</template>

<script setup>
import { ref } from 'vue';

const header = ref('Komora hiperbaryczna Świebodzice');
const message = ref('Bardzo ważne są!');
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

$font: 'Kanit';
@import url('//fonts.googleapis.com/css2?family=#{$font}');
.MainView {
    height: 100%;
    width: 100%;
    background-color: $accent;
    position: relative;
    background-color: $primary;
    font-family: $font;

    &__img {
        position: absolute;
        height: 900px;
        width: 100%;
        z-index: 1;
        background: linear-gradient(to bottom right, rgba($primary, 0.57), rgba($primary, 0.23)), 
                    url('https://aha-hyperbarics.com/wp-content/uploads/2023/05/AHA-Hyperbarics-Breath-1920x782.png') no-repeat center center;
        background-size: cover;
        // Will need adaptation
        clip-path: polygon(50% 0, 100% 0, 100% 100%, 0 86%);
    }

    &__header {
        height: calc(900px - 120px);
        position: relative;
        z-index: 2;

        color: $white;
        margin-top: 100px;
        padding-bottom: 30vw;
        text-align: center;

        h1 {
            text-transform: uppercase;
            font-size: 64px;
            font-weight: 500;
            letter-spacing: 1.2px;
        }

        h3 {
            font-weight: 400;
        }
    }

    &__belt {
        position: absolute;
        top: 840px;
        width: 100%;
        height: 600px;
        left: 0px;
        z-index: 3;
        background-color: $primary;
    }
}
</style>