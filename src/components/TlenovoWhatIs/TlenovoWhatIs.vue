<template>
    <section class="TlenovoWhatIs">
        <div class="TlenovoWhatIs__container">
            <div class="TlenovoWhatIs__header">
                <div class="TlenovoWhatIs__icon">
                    <span>🫁</span>
                </div>
                <h2 class="TlenovoWhatIs__title">
                    Czym Jest Tlenoterapia Hiperbaryczna?
                </h2>
            </div>
            
            <div class="TlenovoWhatIs__content">
                <div class="TlenovoWhatIs__description">
                    <p>
                        <strong>Tlenoterapia hiperbaryczna (HBOT)</strong> to bezpieczna i nieinwazyjna metoda leczenia, 
                        polegająca na oddychaniu czystym tlenem w specjalnej komorze hiperbarycznej.
                    </p>
                    <p>
                        Komora ta symuluje warunki pod zwiększonym ciśnieniem atmosferycznym – zazwyczaj 
                        <span class="TlenovoWhatIs__highlight">2-3 razy wyższym</span> niż normalne. 
                        Dzięki temu Twój organizm otrzymuje dawkę tlenu, która działa jak 
                        <span class="TlenovoWhatIs__highlight">naturalny booster dla zdrowia</span>.
                    </p>
                </div>
                
                <div class="TlenovoWhatIs__benefits">
                    <div class="TlenovoWhatIs__benefit" @click="onBenefitClick('proces-terapii')">
                        <div class="TlenovoWhatIs__benefitIcon">⚡</div>
                        <span>Naturalny booster zdrowia</span>
                    </div>
                    <div class="TlenovoWhatIs__benefit" @click="onBenefitClick('przeciwwskazania')">
                        <div class="TlenovoWhatIs__benefitIcon">🛡️</div>
                        <span>Bezpieczna metoda</span>
                    </div>
                    <div class="TlenovoWhatIs__benefit" @click="onBenefitClick('badania')">
                        <div class="TlenovoWhatIs__benefitIcon">🎯</div>
                        <span>Nieinwazyjna terapia</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { computed } from 'vue';

const props = defineProps({
    isMobile: Boolean
})

const emit = defineEmits(['benefitClick']);

const $q = useQuasar();
// Check if the screen is mobile - fallback if prop is not provided
const isMobileComputed = computed(() => $q.screen.lt.md);

function onBenefitClick(benefitId) {
    const mobileCheck = typeof props.isMobile !== 'undefined' ? props.isMobile : isMobileComputed.value;
    
    if (!mobileCheck) {
       return;
    }
    
    emit('benefitClick', benefitId);
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import 'src/css/quasar.variables.scss';

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.TlenovoWhatIs {
    padding: 40px 0;
    
    &__container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        clip-path: polygon(0 5%, 100% 0, 100% 100%, 0 95%);
        background: linear-gradient(35deg, 
        rgba($white, 0.9) 0%, 
        rgba($white, 1) 100%);
    }
    
    &__header {
        padding-top: 2rem;
        text-align: center;
        margin-bottom: 3rem;
        animation: fadeInUp 0.8s ease-out;
    }

    &__icon {
        margin-bottom: 1.5rem;
        
        span {
            font-size: 4rem;
            display: inline-block;
            padding: 1.5rem;
            background: linear-gradient(135deg, rgba($accent, 0.9), rgba($secondary, 0.3));
            border-radius: 50%;
            backdrop-filter: blur(10px);
            border: 2px solid rgba($accent, 0.2);
            animation: scaleIn 0.8s ease-out 0.2s both;
        }
    }
    
    &__title {
        font-size: 1.8rem;
        font-weight: 700;
        color: $primary;
        margin: 0;
        line-height: 1.2;
        text-align: center;
    }
    
    &__content {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2.5rem;
        align-items: start;
        animation: fadeInUp 0.8s ease-out 0.3s both;
    }
    
    &__description {
        p {
            font-size: 1rem;
            line-height: 1.7;
            color: $primary;
            margin-bottom: 1.5rem;
            
            &:last-child {
                margin-bottom: 0;
            }
        }
        
        strong {
            color: $primary;
            font-weight: 600;
        }
    }
    
    &__highlight {
        background: linear-gradient(135deg, $secondary, $primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 600;
    }
    
    &__benefits {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        margin-bottom: 5rem;
        padding: 0.8rem 1.2rem;
        font-size: 0.9rem;
    }
    
    &__benefit {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        border: 1px solid rgba($accent, 0.1);
        transition: all 0.3s ease;
        font-weight: 500;
        color: $white;
        background: linear-gradient(135deg, $primary, color.adjust($secondary, $lightness: - 45%));
        cursor: pointer;
        
        &:hover {
            transform: translateX(5px);
            border-color: rgba($accent, 0.2);
        }
    }
    
    &__benefitIcon {
        font-size: 1.3rem;
        opacity: 0.8;
    }
    
    // Responsive Design
    @media (max-width: 768px) {
        padding: 60px 0;
        
        &__container {
            padding: 0 1rem;
        }
        
        &__title {
            font-size: 2.2rem;
        }
        
        &__description p {
            font-size: 1.1rem;
        }
        
        &__icon span {
            font-size: 3rem;
            padding: 1rem;
        }
    }
}
</style> 