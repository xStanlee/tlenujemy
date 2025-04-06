<template>
    <q-page-container class="MainView">
        <!-- Form -->
        <Transition name="FormTransition">
            <TlenovoForm class="MainView__form" v-if="isFormVisible" @cancel="onCancelClickHandler" @submit="onSubmitHandler"/>
        </Transition>
            
        <!-- Initial Section -->
        <section :class="{
            'MainView__sectionInitial': true,
            'MainView__sectionInitial--blur': isFormVisible
        }">
            <TlenovoFireflies :isMobile="isMobile" />
            <q-btn
                :class="{
                    'MainView__sectionInitialBtn': true,
                    'MainView__sectionInitialBtn--mobile': isMobile
                }"
                label="Umów się na wizytę"
                rounded
                color="primary"
                size="xl"
                padding="12px 20px"
                @click="onBookClickHandler"
            />
        </section>
        
        <div class="MainView__header">
            <span >Złap oddech zdrowia!</span>
            <h1>Komora Hiperbaryczna</h1>
            <p>Oczyść organizm, odzyskaj energię i przyspiesz regenerację dzięki terapii w komorze hiperbarycznej. Zanurz się w skoncentrowanym tlenie i poczuj, jak znika stres, zmęczenie i miejski smog. Oddychaj pełnią życia!</p>
        </div>

        <!-- Main info Section -->
        <section class="MainView__sectionMain" :class="{ 'MainView__sectionMain--blur': isFormVisible }">
            <TlenovoVideo 
                title="O co chodzi w terapii tlenowej?"
                videoSrc="https://www.youtube.com/embed/2p5vz4YMdjs"
                videoTitle="Tlenovo - Informacje ogólne"
            />
            
            <TlenovoVideo
                title="Zobacz działanie komory hiperbaryczna"
                videoSrc="https://www.youtube.com/embed/zdlYjo-5b1k"
                videoTitle="Tlenovo - Komora Hiperbaryczna"
                is-reversed
             />
 
            <TlenovoVideo />
        </section>
    </q-page-container>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { useSnackbarStore } from 'src/stores/snackbar-store.js';
import { computed, ref } from 'vue';

// Components
import TlenovoFireflies from 'src/components/TlenovoFireflies/TlenovoFireflies.vue';
import TlenovoForm from 'src/components/TlenovoForm/TlenovoForm.vue';
import TlenovoVideo from 'src/components/TlenovoVideo/TlenovoVideo.vue';

const $q = useQuasar();
const useSnackbar = useSnackbarStore();
// Example usage: Check if the screen is mobile
const isMobile = computed(() => $q.screen.lt.md);

// Form visibility state
const isFormVisible = ref(false);

function onSubmitHandler(payload) {
    // Handle form submission logic here
    console.log('Form submitted!', payload);
    isFormVisible.value = false;
    useSnackbar.showSnackbar('Zarezerowowano termin. Do zobaczenia na miejscu!', {
        color: 'positive',
        timeout: 3000,
    });
}

function onCancelClickHandler() {
    isFormVisible.value = false;
}

function onBookClickHandler() {
    isFormVisible.value = true;
}
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

// Variables
$slide-duration: 0.25s;
$slide-easing: ease-out;

// Extract to separate file
@keyframes slideInLeft {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideInBottom {
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

$font: 'Kanit';
@import url('//fonts.googleapis.com/css2?family=#{$font}');

.FormTransition-enter-active {
    animation: slideInBottom $slide-duration $slide-easing;
}

.FormTransition-leave-active {
    animation: slideInBottom $slide-duration $slide-easing reverse;
}

.MainView {
    position: relative;
    font-family: $font;
    background-color: $primary;
    max-width: 100%;

    // Overwrite quasar inline-styles
    padding-top: 0 !important;

    &__form {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 80%;
    }

    &__sectionInitial {
        position: relative;
        height: 950px;
        width: 100%;
        z-index: 1;
        background: linear-gradient(to bottom right, rgba($primary, 0.57), rgba($primary, 0.23)), 
                    url('https://aha-hyperbarics.com/wp-content/uploads/2023/05/AHA-Hyperbarics-Breath-1920x782.png') no-repeat center center;
        background-size: cover;
        clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 86%);

        &--blur {
            opacity: 0.8;
            filter: blur(5px);
        }
    }

    &__sectionInitialBtn {
        top: 70%;
        left: calc(50% - 117px);

        &--mobile {
            top: 80%;
            left: calc(50% - 137px);
        }
    }

    &__header {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        margin: 7.5% 0 0 7.5%;
        width: 30%;
        color: $white;
        animation: slideInLeft .6s ease-in;

        h1 {
            text-transform: uppercase;
            font-size: 72px;
            font-weight: 700;
            letter-spacing: 2px;
            margin-top: 0;
            padding-top: 0;
        }

        span {
            font-size: 32px;
            font-weight: 400;
        }

        p {
            font-size: 24px;
            font-weight: 400;
        }
    }

    &__sectionMain {
        width: 100%;
        

        &--blur {
            filter: blur(5px);
        }
    }

    // Media Queries for Responsiveness
    @media (max-width: 768px) {
        &__sectionInitial {
            height: 700px;
            background: linear-gradient(to bottom right, rgba($primary, 0.57), rgba($primary, 0.23)), 
                    url('https://aha-hyperbarics.com/wp-content/uploads/2023/05/AHA-Hyperbarics-Breath-1920x782.png') no-repeat center center;
            background-size: cover;
            background-position: 65% 20%;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 95%);
        }

        &__header {
            height: calc(600px - 80px);
            margin-top: 50px;
            padding-bottom: 10vw;
            animation: slideInBottom .6s ease-in;

            h1 {
                font-size: 36px;
            }

            span {
                font-size: 18px;
            }

            p {
                font-size: 18px;
            }
        }

        &__sectionMain {
            padding: 50px 0;
        }
    }

    @media (max-width: 480px) {
        &__sectionInitial {
            height: 800px;
        }

        &__header {
            height: calc(500px - 60px);
            width: 80%;
            text-align: center;
            margin-top: 120px;
            padding-bottom: 15vw;
            animation: slideInBottom .6s ease-in;


            h1 {
                margin-top: 100px;
                font-size: 40px;
                line-height: 3rem;
            }

            span {
                font-size: 24px;
                text-transform: uppercase;
            }

            p {
                font-size: 20px;
            }
        }

        &__sectionMain {
            padding: 40px 0;
        }
    }
}
</style>