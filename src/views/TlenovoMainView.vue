<template>
    <q-page-container class="MainView">
        <!-- Form -->
        <Transition name="FormTransition">
            <TlenovoForm 
                v-if="isFormVisible"
                class="MainView__form" 
                @cancel="onCancelClickHandler" 
                @submit="onSubmitHandler"
                @redirect="onRedirectHandler"
            />
        </Transition>
            
        <!-- Initial Section -->
        <section 
            :class="{
                'MainView__sectionInitial': true,
                'MainView__sectionInitial--blur': isFormVisible
            }"
        >
            <div class="MainView__heroContent">
                <h2 class="MainView__heroTitle">
                    Odkryj Moc<br>
                    <span class="MainView__heroHighlight">Czystego Tlenu</span>
                </h2>
                <div class="MainView__headerBenefits">
                    <div class="MainView__benefitItem" @click="onBenefitClick('naturalna-regeneracja')">
                        <span class="MainView__benefitIcon">💪</span>
                        <span>Naturalna regeneracja</span>
                    </div>
                    <div class="MainView__benefitItem" @click="onBenefitClick('najlepsza-koncentracja')">
                        <span class="MainView__benefitIcon">🧠</span>
                        <span>Lepsza koncentracja</span>
                    </div>
                    <div class="MainView__benefitItem" @click="onBenefitClick('wzrost-energii')">
                        <span class="MainView__benefitIcon">⚡</span>
                        <span>Wzrost energii</span>
                    </div>
                </div>
            </div>
            <TlenovoFireflies :isMobile="isMobile" />
        </section>
        
        <!-- Header Section -->
        <header class="MainView__header">
            <h1>Komora Hiperbaryczna</h1>
            <p class="MainView__headerTagline">
                Poczuj różnicę już po pierwszej sesji
            </p>
        </header>

        <!-- Main info Section -->
        <section 
            class="MainView__sectionMain" 
            :class="{ 'MainView__sectionMain--blur': isFormVisible }"
        >
            <!-- Czym jest tlenoterapia -->
            <TlenovoWhatIs @benefitClick="onBenefitClick" />
            <!-- Jak działa tlenoterapia -->
            <TlenovoHowItWorks />
            <!-- Dlaczego warto wybrać tlenoterapię -->
            <TlenovoWhyChoose />
            <!-- CTA Section -->
            <TlenovoCTASection />
        </section>
    </q-page-container>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';

import { useSnackbarStore } from 'src/stores/snackbar-store.js';

// Services
import { appointmentService } from 'src/services/appointment.service.js';
import { notificationService } from 'src/services/notification.service';

// Components
import TlenovoFireflies from 'src/components/TlenovoFireflies/TlenovoFireflies.vue';
import TlenovoForm from 'src/components/TlenovoForm/TlenovoForm.vue';
import TlenovoHowItWorks from 'src/components/TlenovoHowItWorks/TlenovoHowItWorks.vue';
// import TlenovoVideo from 'src/components/TlenovoVideo/TlenovoVideo.vue';
import TlenovoCTASection from 'src/components/TlenovoCTASection/TlenovoCTASection.vue';
import TlenovoWhatIs from 'src/components/TlenovoWhatIs/TlenovoWhatIs.vue';
import TlenovoWhyChoose from 'src/components/TlenovoWhyChoose/TlenovoWhyChoose.vue';

defineProps({
    isFormVisible: Boolean
})

const emit = defineEmits(['redirect', 'formToggle', 'benefitClick']);

const $q = useQuasar();
const useSnackbar = useSnackbarStore();
// Example usage: Check if the screen is mobile
const isMobile = computed(() => $q.screen.lt.md);

// Lazy loading for background image
const backgroundLoaded = ref(false);

onMounted(() => {
  // Lazy load background image
  const img = new Image();
  img.onload = () => {
    backgroundLoaded.value = true;
    document.querySelector('.MainView__sectionInitial')?.classList.add('loaded');
  };
  img.src = 'https://aha-hyperbarics.com/wp-content/uploads/2023/05/AHA-Hyperbarics-Breath-1920x782.png';
});

async function onSubmitHandler(payload) {
    await handleDatastore(payload);
    await handleNotification(payload);
    onCancelClickHandler();
}

async function handleDatastore(payload) {
    try {
        await appointmentService.addAppointment(payload);
        useSnackbar.showSnackbar('Wizyta została pomyślnie umówiona. Zadzwonimy aby potwierdzić.', {
            color: 'positive',
            timeout: 4500,
        });
    } catch {
        useSnackbar.showSnackbar('Wystąpił błąd podczas umawiania wizyty. Spróbuj ponownie.', {
            color: 'negative',
            timeout: 6000,
        });
    }
}

async function handleNotification(payload) {
    const reservationMessage = generateMessage(payload);
    await notificationService.sendReservationNotification(reservationMessage);
}

function generateMessage(payload) {
    return `
        Imię: ${payload.name}
        Telefon: ${payload.phone}
        Data wizyty: ${payload.date}
        Godzina wizyty: ${payload.time}
    `;
}

function onRedirectHandler() {
    emit('redirect');
}

function onCancelClickHandler() {
    emit('formToggle', false);
}

function onBenefitClick(benefitId) {
    console.log('onBenefitClick', benefitId);
    if (!isMobile.value) {
       return;
    }
    
    emit('benefitClick', benefitId);
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import 'src/css/quasar.variables.scss';

// Variables
$slide-duration: 0.25s;
$slide-easing: ease-out;

// Extract to separate file
// Removed unused slideInLeft animation

@keyframes slideInBottom {
    from {
        transform: translate3d(0, 100%, 0);
        opacity: 0;
    }
    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 50px, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

// Removed unused fadeIn animation

// Using system fonts instead of external font for better performance
$font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;

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
    padding-top: 0 !important;

    &__form {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: calc(100% - 80px);
        z-index: 6;
    }

        &__sectionInitial {
        position: relative;
        width: 100%;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        height: 700px;
        // Optimized: use a smaller, compressed image and load lazily
        background: linear-gradient(to bottom right, rgba($primary, 0.57), rgba($primary, 0.23));
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 95%);

        &--blur {
            opacity: 0.8;
            filter: blur(5px);
        }
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom right, rgba($primary, 0.57), rgba($primary, 0.23)), 
                        url('https://aha-hyperbarics.com/wp-content/uploads/2023/05/AHA-Hyperbarics-Breath-1920x782.png');
            background-size: cover;
            background-position: 65% 20%;
            background-repeat: no-repeat;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
        }
        
        &.loaded::before {
            opacity: 1;
        }
    }

        &__heroContent {
        position: absolute;
        right: 10%;
        top: 45%;
        transform: translateY(-50%) translate3d(0, 0, 0);
        text-align: center;
        z-index: 3;
        color: $white;
        will-change: transform, opacity;
        animation: fadeInUp 0.6s ease-out 0.2s both;
    }

    &__heroBadge {
        font-size: 12px;
        padding: 0.4rem 0.8rem;
        // margin-bottom: 1.5rem;
        
        span {
            display: inline-block;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 0.5rem 1.2rem;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
    }

    &__heroTitle {
        font-size: 2.5rem;
        font-weight: 800;
        line-height: 1.2;
        margin: 0 0 1rem 0;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    &__heroHighlight {
        background: linear-gradient(135deg, $primary, color.adjust($secondary, $lightness: -30%));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        display: block;
        font-weight: 900;
    }

    &__heroSubtitle {
        font-size: 1rem;
        font-weight: 400;
        opacity: 0.9;
        margin: 0;
        letter-spacing: 0.5px;
    }

    &__header {
        position: absolute;
        z-index: 2;
        top: 1.4%;
        margin: 0 0 0 10%;
        color: $white;
        // animation: fadeIn .6s ease-in;

        h1 {
            text-transform: uppercase;
            font-size: 2rem;
            font-weight: 800;
            letter-spacing: 1px;
            margin: 1rem 0;
            padding-top: 0;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
            line-height: 1.2;
        }
    }

    &__headerTagline {
        font-size: 1.1rem;
        font-weight: 400;
        opacity: 0.95;
        line-height: 1.2;
    }

    &__headerBenefits {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-top: 1.8rem;
    }

    &__benefitItem {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.8rem 1.2rem;
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 1rem;
        font-weight: 500;
        transition: transform 0.2s ease, background-color 0.2s ease;
        margin-bottom: 0.4rem;
        cursor: pointer;
        will-change: transform;
        transform: translate3d(0, 0, 0);

        &:hover {
            background: rgba(255, 255, 255, 0.12);
            transform: translate3d(5px, 0, 0);
        }
    }

    &__benefitIcon {
        font-size: 1.2rem;
        opacity: 0.9;
    }

    // Media Queries for Responsiveness
    @media (max-width: 768px) {
        &__sectionInitial {
            height: 700px;
            // Background image loaded lazily via CSS class
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 95%);
        }

        &__heroContent {
            right: 5%;
            width: 90%;
            text-align: center;
        }

        &__heroTitle {
            font-size: 3rem;
        }

        &__heroSubtitle {
            font-size: 1.1rem;
        }

        &__header {
            height: calc(600px - 80px);
            width: 90%;
            margin: 50px auto 0;
            left: 50%;
            transform: translateX(-50%);
            padding-bottom: 10vw;
            // animation: fadeIn .6s ease-in;

            h1 {
                font-size: 2.5rem;
                margin: 0.5rem 0;
            }
        }

        &__headerTagline {
            font-size: 1.2rem;
            margin: 1rem 0 1.5rem 0;
        }

        &__headerBenefits {
            gap: 0.8rem;
        }

        &__benefitItem {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
        }
    }

    @media (max-width: 480px) {
        &__sectionInitial {
            height: 800px;
        }

        &__heroContent {
            right: 5%;
            width: 90%;
        }

        &__heroBadge span {
            font-size: 12px;
            padding: 0.4rem 0.8rem;
        }

        &__header {
            height: calc(500px - 100px);
            width: 90%;
            margin-top: 40px;
            padding-bottom: 15vw;
            // animation: fadeIn .9s ease-in;

            h1 {
                margin-top: 1rem;
                font-size: 2.2rem;
                line-height: 1.2;
            }
        }

        &__headerBenefits {
            gap: 0.6rem;
            margin-top: 1.5rem;
        }

        &__benefitItem {
            padding: 0.5rem 0.8rem;
            font-size: 0.85rem;
            gap: 0.8rem;
        }

        &__benefitIcon {
            font-size: 1rem;
        }
    }
}
</style>